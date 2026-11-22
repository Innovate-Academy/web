"use client";

import { useState } from "react";

export default function Soporte() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Soporte enviado:", { name, email, message });
      setSubmitted(true);
    } catch {
      console.error("Error al enviar el formulario de soporte");
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
        <a
          href="/"
          className="mt-6 inline-block text-sm font-semibold text-brand hover:text-brand-hover"
        >
          Volver al inicio →
        </a>
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

      <form
        action=""
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
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
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
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
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all"
          />
        </div>
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
              Elige el curso que te interesa, haz clic en "Inscribirse" y
              completa el proceso de pago.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">
              ¿Puedo cambiar de curso?
            </dt>
            <dd className="mt-1 text-sm text-muted">
              Sí, contáctanos dentro de los primeros 7 días y gestionamos el
              cambio sin costo adicional.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">
              ¿Los cursos tienen certificado?
            </dt>
            <dd className="mt-1 text-sm text-muted">
              Sí, al completar el curso recibirás un certificado digital
              descargable.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">
              ¿Qué métodos de pago aceptan?
            </dt>
            <dd className="mt-1 text-sm text-muted">
              Aceptamos tarjetas de crédito/débito, transferencia bancaria y
              billeteras digitales según tu país.
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
