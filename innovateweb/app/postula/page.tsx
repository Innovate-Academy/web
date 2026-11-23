import Link from "next/link";

const AREAS = [
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

export default function Postula() {
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
          {AREAS.map((area) => (
            <article
              key={area.tag}
              className={`flex flex-col rounded-xl border border-border bg-white p-6 ${CARD_HOVER}`}
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-brand">
                {area.tag}
              </p>
              <h3 className="mt-3 text-lg font-bold leading-snug">
                {area.nombre}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {area.descripcion}
              </p>
              <div className="mt-auto pt-6">
                <button
                  type="button"
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
    </main>
  );
}
