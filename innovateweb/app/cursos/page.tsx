"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../utils/supabase/client";

interface Curso {
  id: number | string;
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

const PACKS = [
  { tag: "PACK / 01", nombre: "Web Starter" },
  { tag: "PACK / 02", nombre: "Backend Starter" },
  { tag: "PACK / 03", nombre: "Creador de Juegos" },
];

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
          throw supabaseError;
        }

        setCursos((data ?? []) as Curso[]);
      } catch (err) {
        console.error("Error al cargar los cursos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    cargarCursos();
  }, []);

  return (
    <main>
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">
          Cursos / Aprende a tu ritmo
        </p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
          Tu próximo paso
          <br />
          empieza aquí.
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
          Nueve cursos para construir tu camino en programación. Elige un curso
          completo o explora nuestros packs.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Todos los cursos</h2>
          <span className="text-xs text-muted">{cursos.length} cursos</span>
        </div>

        {loading ? (
          <div className="mt-10 flex items-center justify-center gap-3 text-sm text-muted">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
            Cargando cursos...
          </div>
        ) : error ? (
          <div className="mt-10 rounded-xl border border-border bg-white p-8 text-center">
            <p className="font-semibold">No se pudieron cargar los cursos.</p>
            <p className="mt-2 text-sm text-muted">Vuelve a intentarlo en unos momentos.</p>
          </div>
        ) : cursos.length === 0 ? (
          <p className="mt-10 text-sm text-muted">No hay cursos disponibles.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {cursos.map((curso) => (
              <article
                key={curso.id}
                className={`flex flex-col rounded-xl border border-border bg-white p-6 transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-0.5 hover:scale-[1.015] hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none ${
                  !curso.dispo ? "opacity-70 grayscale-[0.6]" : ""
                }`}
              >
                <p className="text-xs font-semibold text-brand">
                  {curso.duracion_meses} meses
                </p>
                <h3 className="mt-3 text-lg font-bold leading-snug">
                  {curso.nombre}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted">
                  {curso.descripcion}
                </p>

                <p className="mt-6 font-semibold text-gray-900">
                  ${curso.precio}
                </p>
                <p className="mt-1 text-[11px] text-muted">
                  Pago único por curso completo
                </p>

                {!curso.dispo ? (
                  <p className="mt-5 self-start text-xs font-semibold text-red-600">
                    No disponible
                  </p>
                ) : (
                  <>
                    <button
                      type="button"
                      className="mt-5 w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
                    >
                      Inscribirse
                    </button>
                    <button
                      type="button"
                      className="mt-3 self-start text-xs font-semibold text-brand transition-colors hover:text-brand-hover"
                    >
                      Ver programa →
                    </button>
                  </>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold tracking-tight">
          Un camino, varias posibilidades.
        </h2>
        <p className="mt-2 text-sm text-muted">Explora los packs</p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PACKS.map((pack) => (
            <article
              key={pack.tag}
              className="rounded-xl bg-panel p-6 transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-0.5 hover:scale-[1.015] hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none"
            >
              <p className="text-[11px] font-semibold text-brand">{pack.tag}</p>
              <h3 className="mt-2 text-lg font-bold">{pack.nombre}</h3>
              <p className="mt-2 text-sm text-muted">
                Consulta los cursos incluidos antes de elegir tu pack.
              </p>
              <p className="mt-6 font-semibold text-gray-900">Precio por confirmar</p>
              <button
                type="button"
                className="mt-5 w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
              >
                Elegir pack
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold tracking-tight">
          ¿No sabes por dónde empezar?
        </h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Cuéntanos qué te gustaría aprender y resuelve tus dudas antes de
          inscribirte.
        </p>
        <Link
          href="/soporte"
          className="mt-4 inline-block text-sm font-semibold text-brand"
        >
          Hablar con Soporte →
        </Link>
      </section>
    </main>
  );
}
