"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Area = {
  tag: string;
  nombre: string;
  descripcion: string;
};

const AREAS: Area[] = [
  {
    tag: "Área / 01",
    nombre: "Administrador",
    descripcion: "Área de administración de la academia.",
  },
  {
    tag: "Área / 02",
    nombre: "Marketing",
    descripcion: "Área de comunicación y difusión de la academia.",
  },
  {
    tag: "Área / 03",
    nombre: "Profesor",
    descripcion: "Área de enseñanza y acompañamiento del aprendizaje.",
  },
  {
    tag: "Área / 04",
    nombre: "Staff",
    descripcion: "Área de apoyo al equipo de la academia.",
  },
  {
    tag: "Área / 05",
    nombre: "Gestor",
    descripcion: "Área de gestión y coordinación de la academia.",
  },
];

const CARD_HOVER =
  "transition duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-1 hover:scale-[1.015] hover:border-brand/30 hover:shadow-[0_20px_45px_-12px_rgba(15,23,42,0.28)] hover:ring-1 hover:ring-brand/10 motion-reduce:transform-none motion-reduce:transition-none";

const INPUT_CLASS =
  "w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition-all focus:border-brand focus:ring-2 focus:ring-brand";


export default function Postula() {
  const [area, setArea] = useState<Area | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<{ nombre: string; email: string } | null>(
    null
  );

  function abrir(seleccionada: Area) {
    setArea(seleccionada);
    setSent(null);
    setError(null);
    setLoading(false);
  }

  function cerrar() {
    if (loading) return;
    setArea(null);
    setSent(null);
    setError(null);
  }

  useEffect(() => {
    if (!area) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape" || loading) return;
      setArea(null);
      setSent(null);
      setError(null);
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [area, loading]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!area) return;

    const formData = new FormData(event.currentTarget);
    const nombre = String(formData.get("nombre") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();

    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/postulaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          puesto: area.nombre,
        }),
      });

      const data = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          data?.error ?? "No se pudo enviar la postulación. Intenta de nuevo."
        );
      }

      setSent({ nombre, email });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "No se pudo enviar la postulación. Intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-12">
        <div className="grid gap-10 md:grid-cols-[1fr_320px] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">
              Academia / Postulaciones · /postula/
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-5xl">
              Comparte tu interés
              <br />
              en formar parte.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
              Explora las áreas de Innovate Academy y cuéntanos dónde te
              gustaría aportar.
            </p>
          </div>

          <aside className="rounded-xl bg-panel p-6">
            <h2 className="text-base font-bold">Antes de postularte</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Consulta los detalles del rol antes de enviar tu postulación.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Esta página no constituye una oferta ni una promesa de empleo.
            </p>
          </aside>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold tracking-tight">Encuentra tu área</h2>
        <p className="mt-2 text-sm text-muted">
          Selecciona un rol para iniciar tu postulación.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((item) => (
            <article
              key={item.tag}
              className={`flex flex-col rounded-xl border border-border bg-white p-6 ${CARD_HOVER}`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand">
                {item.tag}
              </p>
              <h3 className="mt-3 text-lg font-bold leading-snug">
                {item.nombre}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {item.descripcion}
              </p>
              <div className="mt-auto pt-6">
                <button
                  type="button"
                  onClick={() => abrir(item)}
                  className="w-full rounded-lg bg-brand py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
                >
                  Postúlate
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-bold tracking-tight">
          ¿Tienes alguna duda?
        </h2>
        <p className="mt-2 text-sm text-muted">
          Consulta con Soporte antes de enviar tu postulación.
        </p>
        <Link
          href="/soporte"
          className="mt-4 inline-block text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
        >
          Ir a Soporte →
        </Link>
      </section>

      {area && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) cerrar();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="postulacion-titulo"
            className="relative w-full max-w-md rounded-2xl border border-border bg-white p-8 shadow-[0_24px_60px_-20px_rgba(15,23,42,0.45)]"
          >
            <button
              type="button"
              onClick={cerrar}
              disabled={loading}
              aria-label="Cerrar formulario"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-lg text-muted transition-colors hover:bg-gray-100 hover:text-foreground disabled:cursor-not-allowed"
            >
              ✕
            </button>

            {sent ? (
              <div className="pt-2 text-center" role="status">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-xl text-green-600">
                  ✓
                </div>
                <h2
                  id="postulacion-titulo"
                  className="mt-5 text-2xl font-bold tracking-tight"
                >
                  Postulación enviada
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {sent.nombre}, recibimos tu postulación a{" "}
                  <strong className="text-foreground">{area.nombre}</strong>. El
                  equipo revisará tu perfil y te contactará a{" "}
                  <strong className="text-foreground">{sent.email}</strong>.
                </p>
                <button
                  type="button"
                  onClick={cerrar}
                  className="mt-6 w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
                >
                  Cerrar
                </button>
              </div>
            ) : (
              <>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-brand">
                  Postulación / {area.tag}
                </p>
                <h2
                  id="postulacion-titulo"
                  className="mt-3 pr-8 text-2xl font-bold tracking-tight"
                >
                  Postúlate a {area.nombre}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Déjanos tu nombre y correo electrónico. Te escribiremos con
                  los siguientes pasos.
                </p>

                <form onSubmit={handleSubmit} className="mt-6">
                  <div className="flex flex-col gap-4">
                    <div>
                      <label
                        htmlFor="postulacion-nombre"
                        className="mb-2 block text-xs font-semibold text-gray-700"
                      >
                        Nombre
                      </label>
                      <input
                        id="postulacion-nombre"
                        name="nombre"
                        type="text"
                        placeholder="Tu nombre completo"
                        autoComplete="name"
                        maxLength={80}
                        required
                        autoFocus
                        className={INPUT_CLASS}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postulacion-email"
                        className="mb-2 block text-xs font-semibold text-gray-700"
                      >
                        Correo electrónico
                      </label>
                      <input
                        id="postulacion-email"
                        name="email"
                        type="email"
                        placeholder="tu@ejemplo.com"
                        autoComplete="email"
                        maxLength={160}
                        required
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                    >
                      {error}
                    </p>
                  )}

                  <p className="mt-4 text-[11px] leading-relaxed text-muted">
                    Usaremos tu nombre, correo y área de interés para valorar tu
                    candidatura. Más información en la{" "}
                    <Link
                      href="/privacidad"
                      className="font-semibold text-brand hover:text-brand-hover"
                    >
                      Política de privacidad
                    </Link>
                    .
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row-reverse">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-lg bg-brand py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:bg-gray-300 sm:flex-1"
                    >
                      {loading ? "Enviando..." : "Enviar postulación"}
                    </button>
                    <button
                      type="button"
                      onClick={cerrar}
                      disabled={loading}
                      className="w-full rounded-lg border border-border py-3 text-sm font-semibold text-foreground transition-colors hover:bg-gray-50 disabled:cursor-not-allowed sm:flex-1"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
