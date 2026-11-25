import Image from "next/image";
import Link from "next/link";

const CARD_HOVER =
  "transition duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-1 hover:scale-[1.015] hover:border-brand/30 hover:shadow-[0_20px_45px_-12px_rgba(15,23,42,0.28)] hover:ring-1 hover:ring-brand/10 motion-reduce:transform-none motion-reduce:transition-none";

const PILARES = [
  {
    titulo: "2× por semana",
    detalle: "Clases en vivo por Google Meet.",
    icono: "calendario",
  },
  {
    titulo: "WhatsApp + Discord",
    detalle: "Seguimiento diario y anuncios.",
    icono: "comunidad",
  },
  {
    titulo: "Proyecto final",
    detalle: "Aprendes haciendo, no memorizando.",
    icono: "codigo",
  },
];

const DIVISIONES = [
  "Dirección General de Innovate Industries",
  "División de Unreal Engine",
  "División de Roblox",
  "División de Minecraft",
  "Innovate Academy",
];

function Icono({ nombre }: { nombre: string }) {
  const props = {
    className: "h-5 w-5",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (nombre === "calendario") {
    return (
      <svg {...props}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M8 3v4M16 3v4M3 10h18" />
      </svg>
    );
  }

  if (nombre === "comunidad") {
    return (
      <svg {...props}>
        <path d="M17 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" />
        <circle cx="9.5" cy="7" r="3.5" />
        <path d="M22 20v-1.5a4 4 0 0 0-3-3.87M16.5 3.6a3.5 3.5 0 0 1 0 6.8" />
      </svg>
    );
  }

  return (
    <svg {...props}>
      <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />
    </svg>
  );
}

export default function SobreNosotros() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <p className="inline-flex items-center gap-2 text-xs font-semibold text-brand">
          <span
            className="h-1.5 w-1.5 rounded-full bg-emerald-500"
            aria-hidden="true"
          />
          Sobre nosotros
        </p>

        <div className="mt-6 grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <h1 className="text-4xl font-bold leading-[1.15] tracking-tight md:text-5xl">
              Innovate <span className="text-brand">Academy</span>
            </h1>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
              Parte de <strong className="font-semibold text-foreground">Innovate Industries</strong>.
              Enseñamos a programar a cualquier persona, desde una página web
              hasta un videojuego.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/cursos"
                className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
              >
                Ver cursos
              </Link>
              <Link
                href="/postula"
                className="rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand/30 hover:bg-panel"
              >
                Postulaciones
              </Link>
            </div>
          </div>

          <div className="relative">
            <div
              className="absolute inset-x-10 -bottom-6 h-24 rounded-full bg-brand/15 blur-3xl"
              aria-hidden="true"
            />
            <div
              className={`relative overflow-hidden rounded-2xl border border-border bg-white p-7 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.35)] ${CARD_HOVER}`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/LogoInnovateAcademy.png"
                  alt=""
                  width={52}
                  height={52}
                  className="rounded-lg"
                />
                <div>
                  <p className="text-sm font-bold">Innovate Academy</p>
                  <p className="text-[11px] text-muted">
                    División educativa de Innovate Industries
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4 border-t border-border pt-6">
                {[
                  "Formación en programación, videojuegos y diseño digital.",
                  "Clases en vivo dos veces por semana.",
                  "Grupos de WhatsApp, Discord, Google Meet y proyectos finales.",
                ].map((texto) => (
                  <div key={texto} className="flex gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                      <svg
                        className="h-3 w-3"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="m5 13 4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-sm leading-relaxed text-muted">{texto}</p>
                  </div>
                ))}
              </div>
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
            Nuestra forma de enseñar
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            Cercanía y organización
          </h2>

          <div className="mt-5 max-w-3xl space-y-4 text-sm leading-relaxed text-muted">
            <p>
              Innovate Academy fue fundada por Innovate Industries. Además de la
              academia, la empresa cuenta con otras ramas como Roblox, Minecraft
              y más. Entre ellas, Innovate Academy se dedica a formar a todo tipo
              de personas en programación, tanto para crear páginas web como
              videojuegos.
            </p>
            <p>
              Nuestro diferenciador es la cercanía y la organización: clases en
              vivo dos veces por semana, grupos de WhatsApp, proyectos finales,
              Google Meet y Discord para mantener conectados a alumnos,
              profesores y supervisores.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {PILARES.map((pilar) => (
              <article
                key={pilar.titulo}
                className={`rounded-xl border border-border bg-white p-5 ${CARD_HOVER}`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e9edfb] text-brand">
                  <Icono nombre={pilar.icono} />
                </span>
                <h3 className="mt-4 text-base font-bold">{pilar.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pilar.detalle}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="https://solarcloud.lat/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-lg border border-border bg-white px-4 py-2.5 transition-colors hover:border-brand/30 hover:bg-panel"
            >
              <span className="text-[11px] text-muted">Patrocinado por</span>
              <span className="flex items-center gap-1.5">
                <Image src="/solarcloud.svg" alt="" width={22} height={22} />
                <span className="text-xs font-semibold">SolarCloud</span>
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="border-t border-border pt-12">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted">
            <span className="text-amber-500" aria-hidden="true">
              —
            </span>
            Innovate Industries
          </p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight">
            Mensaje del CEO
          </h2>

          <div className="mt-8 grid gap-8 lg:grid-cols-[0.62fr_1.38fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div
                className={`rounded-2xl border border-border bg-white p-6 ${CARD_HOVER}`}
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10 text-sm font-bold text-brand">
                  DK
                </span>
                <p className="mt-4 text-sm font-bold">Daniel Kushnirskiy</p>
                <p className="mt-1 text-xs text-muted">
                  CEO de Innovate Industries
                </p>

                <div className="mt-6 border-t border-border pt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">
                    Divisiones
                  </p>
                  <ul className="mt-3 space-y-2">
                    {DIVISIONES.map((division) => (
                      <li
                        key={division}
                        className="flex items-start gap-2 text-xs leading-relaxed text-muted"
                      >
                        <span
                          className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-brand"
                          aria-hidden="true"
                        />
                        {division}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            <article className="rounded-2xl border border-border bg-white p-6 md:p-8">
              <p className="border-l-2 border-brand pl-4 text-sm font-semibold leading-relaxed">
                Soy Daniel Kushnirskiy, CEO de Innovate Industries, una empresa
                dedicada al desarrollo de proyectos digitales, experiencias de
                entretenimiento y formación tecnológica en diferentes
                plataformas.
              </p>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
                <p>
                  Innovate Industries nació de la pasión por el desarrollo de
                  videojuegos. Nuestros primeros pasos los dimos junto a un
                  compañero con un videojuego de terror desarrollado en Unreal
                  Engine. A medida que el proyecto creció y ganó ambición,
                  decidimos expandir nuestras actividades hacia otros sectores
                  de la industria.
                </p>
                <p>
                  Posteriormente creamos nuestra división de Roblox, donde
                  llevamos varios meses desarrollando experiencias y explorando
                  nuevas oportunidades dentro de la plataforma. Más recientemente
                  iniciamos nuestra expansión hacia Minecraft, una división
                  centrada en la organización de eventos, la creación de
                  experiencias para la comunidad y la colaboración con creadores
                  de contenido.
                </p>
                <p>
                  Actualmente desarrollamos Innovate Academy, nuestra división
                  educativa. Su objetivo es ofrecer formación especializada en
                  programación, desarrollo de videojuegos, diseño digital y otras
                  áreas tecnológicas.
                </p>
                <p>
                  Hoy Innovate Industries se organiza en divisiones
                  especializadas para garantizar una gestión eficiente y
                  permitir que cada área crezca de forma independiente. Como CEO,
                  coordino la visión global de la empresa, superviso los
                  proyectos y defino los objetivos estratégicos a largo plazo.
                </p>
                <p>
                  Esta estructura forma parte de una estrategia para construir
                  una marca sólida y diversificada en tecnología y
                  entretenimiento digital. Nuestro objetivo es crear proyectos
                  originales, formar comunidades activas y generar oportunidades
                  para que Innovate Industries siga creciendo en distintos
                  ámbitos.
                </p>
                <p>
                  Aunque somos una empresa joven, tenemos una visión clara de
                  crecimiento y una fuerte apuesta por la innovación, la
                  creatividad y los proyectos con identidad propia. Queremos
                  seguir expandiendo nuestras divisiones, desarrollar
                  experiencias de calidad, formar nuevos profesionales y dejar
                  una huella positiva en las comunidades con las que trabajamos.
                </p>
              </div>

              <p className="mt-7 border-t border-border pt-5 text-sm font-semibold">
                Daniel Kushnirskiy
                <span className="mt-1 block text-xs font-normal text-muted">
                  CEO de Innovate Industries
                </span>
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="border-t border-border pt-12">
          <div className="rounded-2xl border border-border bg-[#161a20] px-6 py-10 text-center shadow-[0_30px_70px_-30px_rgba(15,23,42,0.55)] md:px-10">
            <h2 className="text-2xl font-bold tracking-tight text-white">
              ¿Quieres aprender con nosotros?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-400">
              Empieza desde cero o especialízate. Tenemos cursos de programación,
              desarrollo de videojuegos y diseño digital.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/cursos"
                className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
              >
                Explorar cursos
              </Link>
              <Link
                href="/soporte"
                className="rounded-lg border border-slate-700 bg-transparent px-5 py-3 text-sm font-semibold text-slate-200 transition-colors hover:border-slate-500 hover:bg-white/5"
              >
                Hablar con soporte
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
