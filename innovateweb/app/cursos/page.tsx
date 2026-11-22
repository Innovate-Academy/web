"use client";

import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

interface Curso {
  id: number;
  slug: string;
  nombre: string;
  descripcion: string;
  icono: string;
  estado: string;
  created_at: string;
  duracion_meses: number;
  precio: string;
  resultado: string;
  programas: string[];
  orden: number;
  profe_id: string | null;
  Link_videollamada: string | null;
  dispo: boolean;
}

export default function Cursos() {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function cargarCursos() {
      try {
        const supabase = createClient();
        const { data, error: supabaseError } = await supabase
          .from("cursos")
          .select("*")
          .order("orden", { ascending: true });

        if (supabaseError) {
          console.error("Error al cargar los cursos:", supabaseError);
          setError(true);
        } else {
          setCursos((data ?? []) as Curso[]);
        }
      } catch (err) {
        console.error("Error al inicializar la carga de cursos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    cargarCursos();
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">
        Nuestros cursos
      </h1>

      {loading ? (
        <p>Cargando cursos...</p>
      ) : error ? (
        <div className="text-red-600 space-y-2">
          <p>No se pudieron cargar los cursos.</p>
          <p className="text-sm text-gray-500">
            Revisa la consola del navegador para más detalles.
          </p>
        </div>
      ) : cursos.length === 0 ? (
        <p className="text-gray-600">
          No hay cursos disponibles actualmente.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cursos.map((curso) => (
            <article
              key={curso.id}
              className={`p-6 rounded-xl border shadow-sm ${
                !curso.dispo ? "opacity-50 grayscale" : ""
              }`}
            >
              {typeof curso.icono === "string" && curso.icono.startsWith("http") ? (
                <img
                  src={curso.icono}
                  alt={curso.nombre}
                  className="w-16 h-16 mb-4 object-contain"
                />
              ) : (
                <span className="text-2xl font-bold block mb-2">
                  {curso.icono}
                </span>
              )}
              <h2 className="text-xl font-semibold mb-2">
                {curso.nombre}
              </h2>
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {curso.descripcion}
              </p>
              <p className="text-xs text-gray-500 mb-1">
                Duración: {curso.duracion_meses} meses
              </p>
              <p className="text-sm font-medium text-gray-800 mb-2">
                ${curso.precio}
              </p>
              <p className="text-xs text-gray-400 mb-3">
                Programas: {curso.programas.join(", ")}
              </p>
              {!curso.dispo && (
                <p className="text-xs text-red-600 font-medium mb-3">
                  No disponible
                </p>
              )}
              <a
                href={`/cursos/${curso.slug}`}
                className="text-sm text-blue-600 hover:underline"
              >
                Ver detalle
              </a>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
