"use client";

import { useState } from "react";

const FAQS = [
  {
    pregunta: "¿Son clases en vivo o grabadas?",
    respuesta:
      "Las clases son en vivo con el profesor. Además, cada sesión queda grabada para que puedas repasarla cuando quieras.",
  },
  {
    pregunta: "¿Hay reembolsos o puedo cancelar mi suscripción?",
    respuesta:
      "Sí. Puedes cancelar cuando quieras y solicitar el reembolso dentro de los primeros 7 días escribiendo a Soporte.",
  },
  {
    pregunta: "¿Dónde son las clases?",
    respuesta:
      "Las clases se imparten online por videollamada. Solo necesitas un ordenador y conexión a internet.",
  },
  {
    pregunta: "¿Cómo se comunican el profesor y los alumnos?",
    respuesta:
      "Tenemos un servidor de Discord con canales por curso, además de las sesiones en vivo y el correo de Soporte.",
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
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
