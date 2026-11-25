import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/app/lib/session";

interface Curso {
  id: number;
  slug: string;
  nombre: string;
  descripcion: string;
  icono: string;
  estado: string;
  duracion_meses: number;
  precio: string;
  resultado: string;
  programas: string[];
  orden: number;
  dispo: boolean;
  profe_id: string | null;
}

interface Modulo {
  id: number;
  curso_id: number;
  mes: number;
  titulo: string;
  contenido: string;
  descripcion: string | null;
  orden: number;
}

async function getCurso(slug: string): Promise<Curso | null> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components can't modify cookies
          }
        },
      },
    }
  );

  const { data, error } = await supabase
    .from("cursos")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as Curso;
}

async function getPrograma(cursoId: number): Promise<Modulo[]> {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Components can't modify cookies
          }
        },
      },
    }
  );

  const { data, error } = await supabase
    .from("programas")
    .select("*")
    .eq("curso_id", cursoId)
    .order("mes", { ascending: true })
    .order("orden", { ascending: true });

  if (error) {
    console.error("Error fetching programa:", error);
    return [];
  }

  return (data ?? []) as Modulo[];
}

async function getSessionInfo(): Promise<{ user_id: string | null; isProfesor: boolean }> {
  const user = await getSession();
  return { user_id: user?.id ?? null, isProfesor: false };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CursoProgramaPage({ params }: PageProps) {
  const { slug } = await params;
  const curso = await getCurso(slug);

  if (!curso) {
    notFound();
  }

  const [programa, session] = await Promise.all([
    getPrograma(curso.id),
    getSessionInfo(),
  ]);

  const isOwner = session.isProfesor && curso.profe_id === session.user_id;
  const totalMes = new Set(programa.map((m) => m.mes)).size;

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/cursos"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground mb-8 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver a cursos
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted mb-2">
            <span className="text-2xl">{curso.icono || "📚"}</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand/10 text-brand">
              {curso.duracion_meses} meses
            </span>
            {curso.precio && (
              <span className="font-semibold text-foreground">${curso.precio}</span>
            )}
            <span
              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                curso.dispo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {curso.dispo ? "Disponible" : "No disponible"}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            {curso.nombre}
          </h1>
          <p className="text-muted max-w-2xl">{curso.descripcion}</p>
        </div>

        <div className="rounded-xl border border-border bg-white overflow-hidden">
          <div className="border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-foreground">Programa del curso</h2>
              <div className="text-sm text-muted">
                {totalMes} mes{totalMes !== 1 ? "es" : ""} · {programa.length} módulo{programa.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>

          {programa.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted">Este curso aún no tiene programa definido.</p>
              {isOwner && (
                <Link
                  href={`/dashboard/profesor`}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
                >
                  Gestionar programa
                </Link>
              )}
            </div>
          ) : (
            <div className="divide-y divide-border">
              {Array.from(
                new Map(programa.map((m) => [m.mes, m])).values()
              ).map((mes) => {
                const modulosMes = programa.filter((m) => m.mes === mes.mes);
                return (
                  <div key={mes.mes} className="px-6 py-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-brand/10 flex items-center justify-center text-brand font-bold text-lg">
                        {mes.mes}
                      </div>
                      <h3 className="text-lg font-bold text-foreground">
                        Mes {mes.mes}
                      </h3>
                    </div>
                    <div className="space-y-3 ml-13">
                      {modulosMes.map((modulo) => (
                        <div
                          key={modulo.id}
                          className="rounded-lg border border-border bg-gray-50 p-5 hover:border-brand/30 transition-colors"
                        >
                          <h4 className="font-semibold text-foreground mb-2">{modulo.titulo}</h4>
                          <p className="text-sm text-muted mb-2">{modulo.contenido}</p>
                          {modulo.descripcion && (
                            <p className="text-sm text-muted italic">{modulo.descripcion}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {isOwner && (
            <div className="border-t border-border px-6 py-4 bg-gray-50">
              <Link
                href="/dashboard/profesor"
                className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
              >
                Editar programa
              </Link>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-white px-6 py-3 text-sm font-medium text-muted hover:bg-gray-50 transition-colors"
          >
            Ver todos los cursos
          </Link>
        </div>
      </div>
    </main>
  );
}