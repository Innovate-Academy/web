import type { Metadata } from "next";
import Link from "next/link";
import SocialLinks from "../components/SocialLinks";

export const metadata: Metadata = {
  title: "Comunidad | Innovate Academy",
  description:
    "Sigue a Innovate Academy en Instagram, X, TikTok, Twitch y Kick.",
};

export default function Comunidad() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <section className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">
          Comunidad
        </p>
        <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
          Encuéntranos donde estés
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Publicamos novedades de los cursos, proyectos y contenido de la
          academia. Elige tu red y síguenos para no perderte lo próximo.
        </p>
      </section>

      <section className="mt-10 max-w-3xl">
        <SocialLinks variant="cards" />
      </section>

      <section className="mt-12 max-w-3xl rounded-xl border border-border bg-panel p-8">
        <h2 className="text-lg font-bold">¿Todavía no sabes por dónde empezar?</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Explora los cursos disponibles y elige el que mejor encaje con tu
          nivel. También puedes escribirnos si necesitas orientación.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/cursos"
            className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            Ver cursos
          </Link>
          <Link
            href="/soporte"
            className="rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold transition-colors hover:bg-gray-50"
          >
            Hablar con soporte
          </Link>
        </div>
      </section>
    </main>
  );
}
