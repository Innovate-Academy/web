import { createClient } from "../utils/supabase/server";

// Evita que Next.js cachee resultados antiguos al añadir o editar cursos
export const dynamic = "force-dynamic";

interface Curso {
  id: string | number;
  nombre: string | null;
  descripcion: string | null;
}

export default async function Cursos() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cursos")
    .select("id, nombre, descripcion")
    .order("id", { ascending: true });

  const cursos = (data ?? []) as Curso[];

  if (error) {
    console.error("Error al cargar los cursos:", error.message, error);

    return (
      <main className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-4">Nuestros cursos</h1>
        <p className="text-red-600">
          No se pudieron cargar los cursos en este momento.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Nuestros cursos</h1>

      {cursos.length === 0 ? (
        <p className="text-gray-600">No hay cursos disponibles actualmente.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map((curso) => (
            <article
              key={curso.id}
              className="p-6 rounded-xl border shadow-sm"
            >
              <h2 className="text-2xl font-semibold mb-2">
                {curso.nombre ?? "Curso sin título"}
              </h2>

              <p className="text-gray-600">
                {curso.descripcion ?? "Sin descripción disponible."}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}