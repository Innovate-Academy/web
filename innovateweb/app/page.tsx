import Link from "next/link";
import Faq from "./components/Faq";

const CURSOS_RECOMENDADOS = [
  {
    slug: "html-css",
    nombre: "HTML / CSS",
    icono: "HC",
    nivel: "Inicial",
    descripcion: "Estructura y diseño web. La base para todo lo demás.",
  },
  {
    slug: "python",
    nombre: "Python",
    icono: "PY",
    nivel: "Desde cero",
    descripcion: "Lógica y Backend. Desde tu primer print hasta APIs.",
  },
  {
    slug: "javascript",
    nombre: "JavaScript",
    icono: "JS",
    nivel: "Intermedio",
    descripcion: "Interactividad y Frontend fluido y moderno.",
  },
];

const CARD_HOVER =
  "transition duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-1 hover:scale-[1.015] hover:border-brand/30 hover:shadow-[0_20px_45px_-12px_rgba(15,23,42,0.28)] hover:ring-1 hover:ring-brand/10 motion-reduce:transform-none motion-reduce:transition-none";

export default function Home() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold text-brand">
              <span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                aria-hidden="true"
              />
              Academia de programación
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-[1.15] tracking-tight md:text-5xl">
              De tu primer <span className="font-mono">print()</span>
              <br />a un stack completo.
            </h1>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              Enseñamos a programar desde cero: lógica, Backend y Frontend, con
              clases en vivo, seguimiento cercano y proyectos reales.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/cursos"
                className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
              >
                Ver cursos
              </Link>
              <Link
                href="/comunidad"
                className="rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand/30 hover:bg-panel"
              >
                Únete a Discord
              </Link>
              <Link
                href="/postula"
                className="rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand/30 hover:bg-panel"
              >
                Únete a nuestro Equipo
              </Link>
            </div>

            <p className="mt-6 text-xs text-muted">
              Desde cero · Paso a paso · Proyectos reales
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-lg border border-border bg-white px-3 py-2">
              <span className="text-[11px] text-muted">Patrocinado por</span>
              <span className="flex items-center gap-1.5">
                <span className="flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-sky-500 to-indigo-500 text-[10px] font-bold text-white">
                  S
                </span>
                <span className="text-xs font-semibold">SolarCloud</span>
              </span>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute inset-x-10 -bottom-6 h-24 rounded-full bg-brand/15 blur-3xl"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-[#161a20] shadow-[0_30px_70px_-25px_rgba(15,23,42,0.55)]">
              <div className="flex items-center gap-2 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <pre className="overflow-x-auto px-5 pb-6 font-mono text-[12px] leading-[1.9] text-slate-300 sm:text-[13px]">
                <code>
                  <span className="block text-slate-500">{"// mes 1"}</span>
                  <span className="block">
                    <span className="text-sky-400">print</span>
                    <span className="text-slate-400">(</span>
                    <span className="text-amber-300">
                      &quot;Hola, mundo&quot;
                    </span>
                    <span className="text-slate-400">)</span>
                  </span>
                  <span className="block">&nbsp;</span>
                  <span className="block text-slate-500">{"// mes 4"}</span>
                  <span className="block">
                    <span className="text-sky-400">def</span>{" "}
                    <span className="text-amber-200">ruta_aprendizaje</span>
                    <span className="text-slate-400">():</span>
                  </span>
                  <span className="block pl-5">
                    <span className="text-fuchsia-400">return</span>{" "}
                    <span className="text-sky-400">app.get</span>
                    <span className="text-slate-400">(</span>
                    <span className="text-amber-300">&quot;/cursos&quot;</span>
                    <span className="text-slate-400">)</span>
                  </span>
                  <span className="block">&nbsp;</span>
                  <span className="block text-slate-500">{"// mes 6"}</span>
                  <span className="block">
                    <span className="text-sky-400">
                      export default function
                    </span>{" "}
                    <span className="text-amber-200">App</span>
                    <span className="text-slate-400">() {"{"}</span>
                  </span>
                  <span className="block pl-5">
                    <span className="text-fuchsia-400">return</span>{" "}
                    <span className="text-orange-300">
                      &lt;Curso activo /&gt;
                    </span>
                  </span>
                  <span className="block text-slate-400">{"}"}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="border-t border-border pt-12">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted">
            <span className="text-amber-500" aria-hidden="true">
              —
            </span>
            Cursos · Información
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            Cursos Recomendados
          </h2>
          <p className="mt-2 text-sm text-muted">Empieza por el que quieras.</p>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CURSOS_RECOMENDADOS.map((curso) => (
              <article
                key={curso.slug}
                className={`flex flex-col rounded-xl border border-border bg-white p-5 ${CARD_HOVER}`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e9edfb] text-xs font-bold text-brand">
                    {curso.icono}
                  </span>
                  <Link
                    href={`/cursos/${curso.slug}/programa`}
                    aria-label={`Ver información de ${curso.nombre}`}
                    className="rounded p-1 text-muted transition-colors hover:text-brand"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path
                        d="M7 17 17 7M9 7h8v8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>

                <p className="mt-4 rounded bg-[#f7f0e2] px-3 py-2 text-[11px] text-[#8a6a3b]">
                  {curso.nivel}
                </p>
                <h3 className="mt-4 text-base font-bold">{curso.nombre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {curso.descripcion}
                </p>

                <div className="mt-auto pt-5">
                  <Link
                    href={`/cursos/${curso.slug}/programa`}
                    className="text-xs font-semibold text-brand transition-colors hover:text-brand-hover"
                  >
                    Ver información →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="border-t border-border pt-12">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted">
            <span className="text-amber-500" aria-hidden="true">
              —
            </span>
            FAQ
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            Preguntas frecuentes
          </h2>
          <p className="mt-2 text-sm text-muted">Dudas comunes</p>

          <Faq />
        </div>
      </section>
    </main>
  );
}
