"use client";

import Link from "next/link";
import { useState } from "react";
import { LEGAL_INFO } from "../lib/legal";

export default function Soporte() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(false);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      const response = await fetch("/api/soporte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar");
      }

      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <main className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <span className="text-green-600 text-2xl">✓</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Mensaje enviado
        </h1>
        <p className="text-sm text-muted max-w-xl mx-auto">
          Gracias por contactarnos. Te responderemos a la brevedad posible.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block text-sm font-semibold text-brand hover:text-brand-hover"
        >
          Volver al inicio →
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <section className="mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">
          Centro de soporte
        </p>
        <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
          ¿Necesitas ayuda?
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">
          Escríbenos y uno de nuestro equipo te responderá a la brevedad.
          Revisa también nuestras preguntas frecuentes antes de enviarnos un
          mensaje.
        </p>
      </section>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          No se pudo enviar el mensaje. Intenta de nuevo.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl rounded-xl border border-border bg-white p-8 shadow-sm"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold text-gray-700 mb-2"
            >
              Nombre
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Juan Pérez"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-gray-700 mb-2"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="juan@ejemplo.com"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all sm:text-sm"
            />
          </div>
        </div>
        <div className="mb-6">
          <label
            htmlFor="message"
            className="block text-xs font-semibold text-gray-700 mb-2"
          >
            Mensaje
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Cuéntanos cómo podemos ayudarte..."
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-base focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all sm:text-sm"
          />
        </div>
        <p className="mb-6 text-[11px] leading-relaxed text-muted">
          Usaremos tu nombre, correo y mensaje para atender tu consulta. Más
          información en la{" "}
          <Link
            href="/privacidad"
            className="font-semibold text-brand hover:text-brand-hover"
          >
            Política de privacidad
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-brand py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando..." : "Enviar mensaje"}
        </button>
      </form>

      <section className="mt-16 rounded-xl bg-panel p-8">
        <h2 className="text-xl font-bold mb-4">Preguntas frecuentes</h2>
        <dl className="space-y-4">
          <div>
            <dt className="font-semibold text-gray-900">
              ¿Cómo me inscribo a un curso?
            </dt>
            <dd className="mt-1 text-sm text-muted">
              Elige el curso que te interesa, entra con tu cuenta de Google y
              envía la solicitud. El equipo te confirmará por correo la
              disponibilidad de plaza y el medio de pago.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">
              ¿Puedo cambiar de curso?
            </dt>
            <dd className="mt-1 text-sm text-muted">
              Escríbenos dentro de los primeros 14 días y valoramos el cambio
              según la disponibilidad de la cohorte. El cambio no genera un
              derecho automático a reembolso.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">
              ¿Los cursos tienen certificado?
            </dt>
            <dd className="mt-1 text-sm text-muted">
              Sí, al completar el curso recibirás un certificado digital
              descargable de Innovate Academy. No es un título oficial.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">
              ¿Qué métodos de pago aceptan?
            </dt>
            <dd className="mt-1 text-sm text-muted">
              El medio de pago se indica en la ficha del curso y en el correo de
              confirmación. No almacenamos datos de tarjeta; cuando se habilite
              una pasarela de pago, será un proveedor de pagos quien los procese.
            </dd>
          </div>
        </dl>
      </section>

      <section className="mt-16 max-w-3xl rounded-xl border border-border bg-white p-8">
        <h2 className="text-xl font-bold">Reclamaciones y quejas</h2>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Si no estás conforme con el servicio, escríbenos desde este formulario
          o a{" "}
          <a
            href="mailto:innovatesoporte2026@gmail.com"
            className="font-semibold text-brand hover:text-brand-hover"
          >
            innovatesoporte2026@gmail.com
          </a>{" "}
          indicando en el asunto «Reembolso o cancelación» u «Otro tema».
          Responderemos en un plazo máximo de 10 días hábiles.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Puedes solicitar la hoja de reclamaciones correspondiente conforme a la
          normativa de{" "}
          {LEGAL_INFO.comunidad
            ? `la comunidad autónoma de ${LEGAL_INFO.comunidad}`
            : "la comunidad autónoma donde radica el titular"}
          . También puedes acudir a la oficina de consumo de tu localidad o
          comunidad autónoma y consultar la{" "}
          <Link
            href="/desistimiento"
            className="font-semibold text-brand hover:text-brand-hover"
          >
            política de desistimiento y reembolso
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
