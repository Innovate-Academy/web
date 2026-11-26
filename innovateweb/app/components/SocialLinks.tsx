"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import {
  INSTAGRAM_DM_MESSAGE,
  INSTAGRAM_DM_URL,
  SOCIALS,
  type SocialNetwork,
} from "../lib/social";

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Se intenta el método clásico justo debajo.
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    document.body.removeChild(textarea);
    return copied;
  } catch {
    return false;
  }
}

export default function SocialLinks({
  variant = "footer",
}: {
  variant?: "footer" | "cards";
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">(
    "idle"
  );
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (!dialogOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [dialogOpen]);

  useEffect(() => {
    if (!toast) return;

    const timer = window.setTimeout(() => setToast(null), 7000);
    return () => window.clearTimeout(timer);
  }, [toast]);

  function handleClick(
    event: MouseEvent<HTMLAnchorElement>,
    social: SocialNetwork
  ) {
    if (!social.directMessage) return;

    event.preventDefault();
    setCopyState("idle");
    setDialogOpen(true);

    // Se copia dentro del clic para que el navegador lo permita.
    void copyToClipboard(INSTAGRAM_DM_MESSAGE).then((copied) => {
      setCopyState(copied ? "copied" : "failed");
    });
  }

  function openInstagramChat() {
    // Se vuelve a copiar dentro del clic por si el primer intento falló.
    void copyToClipboard(INSTAGRAM_DM_MESSAGE);
    window.open(INSTAGRAM_DM_URL, "_blank", "noopener,noreferrer");
    setDialogOpen(false);
    setToast("Chat abierto. Pega el mensaje en la conversación.");
  }

  const content =
    variant === "cards" ? (
      <div className="grid gap-4 sm:grid-cols-2">
        {SOCIALS.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => handleClick(event, social)}
            className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-sm motion-reduce:transform-none"
          >
            <span>
              <span className="block text-sm font-bold text-foreground">
                {social.name}
              </span>
              <span className="mt-1 block text-xs text-muted">
                {social.handle}
              </span>
              {social.directMessage ? (
                <span className="mt-2 block text-[11px] font-semibold text-brand">
                  Abrir chat con mensaje
                </span>
              ) : null}
            </span>
            <span
              aria-hidden="true"
              className="text-lg text-brand transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
            >
              ↗
            </span>
          </a>
        ))}
      </div>
    ) : (
      <ul className="mt-4 flex flex-col gap-2 text-xs text-muted">
        {SOCIALS.map((social) => (
          <li key={social.name}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(event) => handleClick(event, social)}
              className="group inline-flex flex-wrap items-baseline gap-x-1.5 hover:text-foreground"
            >
              <span className="font-medium">{social.name}</span>
              <span className="text-[11px]">{social.handle}</span>
              <span
                aria-hidden="true"
                className="text-brand opacity-0 transition-opacity group-hover:opacity-100"
              >
                ↗
              </span>
            </a>
          </li>
        ))}
      </ul>
    );

  return (
    <>
      {content}

      {dialogOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4"
          role="presentation"
          onClick={() => setDialogOpen(false)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setDialogOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="instagram-chat-title"
            className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-brand">
                  Instagram
                </p>
                <h2
                  id="instagram-chat-title"
                  className="mt-1 text-lg font-bold"
                >
                  Abrir chat con @innovateacademy.site
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                aria-label="Cerrar"
                className="text-xl leading-none text-muted transition-colors hover:text-foreground"
              >
                ×
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted">
              Instagram no permite enviar un mensaje automático desde la web.
              Abriremos tu chat con este mensaje copiado para que solo tengas que
              pegarlo:
            </p>

            <p className="mt-4 rounded-lg border border-border bg-panel p-4 text-sm leading-relaxed text-foreground">
              {INSTAGRAM_DM_MESSAGE}
            </p>

            <p
              className={`mt-3 text-xs leading-relaxed ${
                copyState === "failed" ? "text-amber-700" : "text-muted"
              }`}
            >
              {copyState === "copied"
                ? "Mensaje copiado. Al abrir el chat, pégalo con Ctrl+V o manteniendo pulsado."
                : copyState === "failed"
                  ? "No pudimos copiarlo automáticamente. Selecciona el texto de arriba y cópialo."
                  : "Copiando el mensaje..."}
            </p>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row-reverse">
              <button
                type="button"
                onClick={openInstagramChat}
                autoFocus
                className="w-full rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover sm:w-auto"
              >
                Copiar mensaje y abrir chat
              </button>
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="w-full rounded-lg border border-border px-5 py-3 text-sm font-semibold text-muted transition-colors hover:bg-gray-50 sm:w-auto"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {toast ? (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-[110] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-3 text-center text-xs font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      ) : null}
    </>
  );
}
