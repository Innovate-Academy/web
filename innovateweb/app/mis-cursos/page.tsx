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

interface Curso {
  id: number | string;
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
}

async function getSession(): Promise<DiscordUser | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) return null;

  try {
    return JSON.parse(session.value);
  } catch {
    return null;
  }
}

async function getProfesorId(userId: string): Promise<string | null> {
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

  const { data } = await supabase
    .from("profesores")
    .select("id")
    .eq("user_id", userId)
    .single();

  return data?.id ?? null;
}

async function getEnrolledCourses(userId: string): Promise<Curso[]> {
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

  const { data: enrollments, error } = await supabase
    .from("inscripciones")
    .select(`
      curso_id,
      creado_en,
      cursos (
        id,
        slug,
        nombre,
        descripcion,
        icono,
        estado,
        duracion_meses,
        precio,
        resultado,
        programas,
        orden,
        dispo
      )
    `)
    .eq("user_id", userId)
    .order("creado_en", { ascending: false });

  if (error) {
    console.error("Error fetching enrolled courses:", error);
    return [];
  }

  return (enrollments ?? []).flatMap((enrollment) => {
    const curso = enrollment.cursos;
    return (Array.isArray(curso) ? curso : curso ? [curso] : []) as unknown as Curso[];
  });
}

async function getTeachingCourses(profesorId: string): Promise<Curso[]> {
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

  const { data: cursos, error } = await supabase
    .from("cursos")
    .select("id, slug, nombre, descripcion, icono, estado, duracion_meses, precio, resultado, programas, orden, dispo")
    .eq("profe_id", profesorId)
    .order("orden", { ascending: true });

  if (error) {
    console.error("Error fetching teaching courses:", error);
    return [];
  }

  return (cursos ?? []) as Curso[];
}

async function MisCursosContent() {
  const user = await getSession();

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-border flex items-center justify-center mx-auto mb-6">
            <span className="text-muted text-2xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Inicia sesión para ver tus cursos
          </h1>
          <p className="text-muted mb-6">
            Necesitas estar autenticado con Discord para acceder a tus cursos inscritos.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center gap-2 w-full rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
          >
            Iniciar sesión con Discord
          </Link>
        </div>
      </main>
    );
  }

  const profesorId = await getProfesorId(user.id);
  const isProfesor = !!profesorId;

  const [enrolledCourses, teachingCourses] = await Promise.all([
    getEnrolledCourses(user.id),
    isProfesor ? getTeachingCourses(profesorId!) : Promise.resolve([]),
  ]);

  // Combine unique courses (by id)
  const allCoursesMap = new Map<string, Curso>();
  enrolledCourses.forEach((c) => allCoursesMap.set(String(c.id), c));
  teachingCourses.forEach((c) => allCoursesMap.set(String(c.id), c));
  const allCourses = Array.from(allCoursesMap.values());

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Mis cursos
            </h1>
            <p className="mt-2 text-muted">
              {allCourses.length} curso{allCourses.length !== 1 ? "s" : ""} total
              {isProfesor && (
                <span className="ml-2">
                  ({enrolledCourses.length} inscritos, {teachingCourses.length} impartiendo)
                </span>
              )}
            </p>
          </div>
          {isProfesor && (
            <Link
              href="/dashboard/profesor"
              className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
            >
              Panel de profesor
            </Link>
          )}
        </div>

        {allCourses.length === 0 ? (
          <div className="rounded-xl border border-border bg-white p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-6 text-4xl">
              📚
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              No tienes cursos aún
            </h2>
            <p className="text-muted mb-8 max-w-md mx-auto">
              {isProfesor
                ? "No tienes cursos asignados como profesor ni inscripciones como alumno."
                : "Explora nuestro catálogo y encuentra el curso perfecto para ti."}
            </p>
            <Link
              href="/cursos"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
            >
              Ver cursos disponibles
            </Link>
          </div>
        ) : (
          <>
            {enrolledCourses.length > 0 && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  Inscritos como alumno ({enrolledCourses.length})
                </h2>
                <div className="space-y-4">
                  {enrolledCourses.map((curso) => (
                    <article
                      key={`enrolled-${curso.id}`}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-border bg-white p-6 transition-colors hover:border-brand/30 hover:shadow-lg ${
                        !curso.dispo ? "opacity-70" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-16 h-16 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                          <span className="text-3xl">{curso.icono || "📚"}</span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-foreground truncate">
                            {curso.nombre}
                          </h3>
                          <p className="mt-1 text-sm text-muted truncate">
                            {curso.descripcion}
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted">
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                              {curso.duracion_meses} meses
                            </span>
                            <span className="font-semibold text-foreground">
                              ${curso.precio}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                curso.dispo
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {curso.dispo ? "Disponible" : "No disponible"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={`/cursos/${curso.slug}`}
                          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
                        >
                          Continuar aprendiendo
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}

            {teachingCourses.length > 0 && (
              <div>
                <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand" />
                  Impartiendo como profesor ({teachingCourses.length})
                </h2>
                <div className="space-y-4">
                  {teachingCourses.map((curso) => (
                    <article
                      key={`teaching-${curso.id}`}
                      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-brand/30 bg-brand/5 p-6 transition-colors hover:border-brand/50 hover:shadow-lg ${
                        !curso.dispo ? "opacity-70" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-16 h-16 rounded-xl bg-brand/20 flex items-center justify-center shrink-0">
                          <span className="text-3xl">{curso.icono || "📚"}</span>
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-foreground truncate">
                              {curso.nombre}
                            </h3>
                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-brand/20 text-brand">
                              Profesor
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-muted truncate">
                            {curso.descripcion}
                          </p>
                          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted">
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                              {curso.duracion_meses} meses
                            </span>
                            <span className="font-semibold text-foreground">
                              ${curso.precio}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                curso.dispo
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {curso.dispo ? "Disponible" : "No disponible"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <Link
                          href={`/dashboard/profesor`}
                          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
                        >
                          Gestionar curso
                        </Link>
                        <Link
                          href={`/cursos/${curso.slug}`}
                          className="rounded-lg border border-border bg-white px-5 py-2.5 text-sm font-semibold text-muted hover:bg-gray-50 transition-colors"
                        >
                          Ver como alumno
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default MisCursosContent;