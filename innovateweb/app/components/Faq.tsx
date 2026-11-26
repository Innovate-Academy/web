"use client";

import Link from "next/link";
import { useState } from "react";

const FAQS = [
  {
    pregunta: "¿Son clases en vivo o grabadas?",
    respuesta:
      "Las clases son en vivo con el profesor. Además, cada sesión queda grabada para que puedas repasarla cuando quieras.",
  },
  {
    pregunta: "¿Puedo cancelar o pedir un reembolso?",
    respuesta:
      "Sí. Tienes 14 días naturales desde la contratación para desistir sin indicar el motivo. Escríbenos a Soporte y te explicamos cómo hacerlo y cómo se calcula la devolución.",
    enlace: {
      href: "/desistimiento",
      label: "Ver la política de desistimiento y reembolso",
    },
  },
  {
    pregunta: "¿Dónde son las clases?",
    respuesta:
      "Las clases se imparten online por videollamada con Google Meet. Solo necesitas un ordenador y conexión a internet.",
  },
  {
    pregunta: "¿Cómo se comunican el profesor y los alumnos?",
    respuesta:
      "Las sesiones son en vivo por Google Meet y las dudas se atienden por el correo de Soporte y desde tu panel de cursos.",
  },
  {
    pregunta: "¿Puede trabajar o enseñar en la academia?",
    respuesta:
      "Sí. Puedes postularte a Administrador, Marketing, Profesor, Staff o Gestor desde la página de Postulaciones.",
  },
];

export default function Faq() {
  const [abierta, setAbierta] = useState<number | null>(null);

  return (
    <div className="mt-8 flex max-w-3xl flex-col gap-3">
      {FAQS.map((item, index) => {
        const isOpen = abierta === index;

        return (
          <div
            key={item.pregunta}
            className="overflow-hidden rounded-lg border border-border bg-white"
          >
            <button
              type="button"
              onClick={() => setAbierta(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold transition-colors hover:bg-gray-50"
            >
              <span>{item.pregunta}</span>
              <span
                aria-hidden="true"
                className={`flex h-5 w-5 shrink-0 items-center justify-center text-lg font-normal text-brand transition-transform duration-300 motion-reduce:transition-none ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                  {item.respuesta}
                  {"enlace" in item && item.enlace ? (
                    <>
                      {" "}
                      <Link
                        href={item.enlace.href}
                        className="font-semibold text-brand hover:text-brand-hover"
                      >
                        {item.enlace.label}
                      </Link>
                      .
                    </>
                  ) : null}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
