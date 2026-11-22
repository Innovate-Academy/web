import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import Link from "next/link";

interface DiscordUser {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
  email: string | null;
  discriminator: string;
  avatar_url: string | null;
}

interface Profesor {
  id: number;
  nombre: string;
}

interface Curso {
  id: number | string;
  slug: string;
  nombre: string;
  descripcion: string;
  icono: string;
  duracion_meses: number;
  precio: string;
  dispo: boolean;
}

interface Alumno {
  id: string;
  username: string;
  global_name: string | null;
  avatar_url: string | null;
  email: string | null;
  inscrito_en: string;
  curso_nombre: string;
  curso_slug: string;
}

async function getSession(): Promise<{ user: DiscordUser | null; profesor: Profesor | null }> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) return { user: null, profesor: null };

  try {
    const user = JSON.parse(session.value);
    const discordId = user.id;

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

    const { data: profesor } = await supabase
      .from("profesores")
      .select("id, nombre")
      .eq("user_id", discordId)
      .single();

    return { user, profesor: profesor ?? null };
  } catch {
    return { user: null, profesor: null };
  }
}

async function getProfesorData(profesorId: number) {
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
    });

  const { data: cursos } = await supabase
    .from("cursos")
    .select("id, slug, nombre, descripcion, icono, duracion_meses, precio, dispo")
    .eq("profesor_id", profesorId)
    .order("orden", { ascending: true });

  const { data: inscripciones } = await supabase
    .from("inscripciones")
    .select(`
      id,
      user_id,
      creado_en,
      cursos!inner (
        id,
        slug,
        nombre
      )
    `)
    .eq("profesor_id", profesorId)
    .order("creado_en", { ascending: false });

  const totalAlumnos = inscripciones?.length ?? 0;
  const totalCursos = cursos?.length ?? 0;

  return {
    cursos: (cursos ?? []) as Curso[],
    inscripciones: (inscripciones ?? []) as any[],
    stats: { totalAlumnos, totalCursos },
  };
}

async function ProfesorDashboardContent() {
  const { user, profesor } = await getSession();

  if (!user || !profesor) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md p-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6 text-4xl">
            🔒
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Acceso denegado
          </h1>
          <p className="text-muted mb-6">
            Solo los profesores pueden acceder a este panel.
          </p>
          <Link
            href="/mis-cursos"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
          >
            Ir a mis cursos
          </Link>
        </div>
      </main>
    );
  }

  const { cursos, inscripciones, stats } = await getProfesorData(profesor.id);

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Panel de Profesor
            </h1>
            <p className="mt-2 text-muted">
              Bienvenido, {profesor.nombre}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/mis-cursos"
              className="rounded-lg border border-border bg-white px-5 py-2.5 text-sm font-medium text-muted hover:bg-gray-50 transition-colors"
            >
              Ver como alumno
            </Link>
            <Link
              href="/cursos"
              className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
            >
              Ver catálogo
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-border bg-white p-6">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">
              Total alumnos
            </p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stats.totalAlumnos}</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-6">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">
              Mis cursos
            </p>
            <p className="mt-2 text-3xl font-bold text-foreground">{stats.totalCursos}</p>
          </div>
          <div className="rounded-xl border border-border bg-white p-6">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider">
              Inscripciones totales
            </p>
            <p className="mt-2 text-3xl font-bold text-foreground">{inscripciones.length}</p>
          </div>
          <div className="rounded-xl border border-brand bg-brand/50 p-6">
            <p className="text-xs font-semibold text-brand uppercase tracking-wider">
              Rol: Profesor
            </p>
            <p className="mt-2 text-lg font-bold text-brand">Activo</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white overflow-hidden">
          <div className="border-b border-border px-6 py-4">
            <h2 className="text-lg font-bold text-foreground">Alumnos inscritos</h2>
          </div>

          {inscripciones.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted">No hay alumnos inscritos en tus cursos aún.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                      Alumno
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                      Curso
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                      Fecha inscripción
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-muted uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {inscripciones.map((inscripcion) => (
                    <tr key={inscripcion.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">
                            {inscripcion.user_id.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              Usuario: {inscripcion.user_id}
                            </p>
                            <p className="text-xs text-muted">
                              Discord ID
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          href={`/cursos/${inscripcion.cursos.slug}`}
                          className="font-medium text-brand hover:underline"
                        >
                          {inscripcion.cursos.nombre}
                        </Link>
                      </td>
                      <td className="px-4 py-4 text-sm text-muted">
                        {new Date(inscripcion.creado_en).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          href={`/cursos/${inscripcion.cursos.slug}`}
                          className="text-sm font-medium text-brand hover:underline"
                        >
                          Ver curso
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {cursos.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-bold text-foreground mb-4">Mis cursos</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cursos.map((curso) => (
                <article
                  key={curso.id}
                  className={`rounded-xl border border-border bg-white p-6 transition-colors hover:border-brand/30 ${
                    !curso.dispo ? "opacity-70" : ""
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mb-4">
                    <span className="text-2xl">{curso.icono || "📚"}</span>
                  </div>
                  <h3 className="font-bold text-foreground">{curso.nombre}</h3>
                  <p className="mt-2 text-sm text-muted line-clamp-2">{curso.descripcion}</p>
                  <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                    <span>{curso.duracion_meses} meses</span>
                    <span className="font-semibold text-foreground">${curso.precio}</span>
                  </div>
                  <Link
                    href={`/cursos/${curso.slug}`}
                    className="mt-4 block w-full text-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
                  >
                    Gestionar curso
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default ProfesorDashboardContent;