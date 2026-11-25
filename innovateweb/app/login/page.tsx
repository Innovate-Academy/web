"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_ID_CONFIGURADO,
} from "../lib/google-auth-config";

const MESSAGES: Record<string, string> = {
  no_code: "No se recibió el código de autorización.",
  token_failed: "Error al obtener el token de acceso.",
  user_failed: "Error al obtener tu perfil de Google.",
  not_configured: "Google Sign-In no está configurado en el servidor.",
  unexpected: "Ocurrió un error inesperado.",
};

interface CredentialResponse {
  credential?: string;
}

interface GoogleIdentity {
  initialize(options: {
    client_id: string;
    callback: (response: CredentialResponse) => void;
  }): void;
  renderButton(
    parent: HTMLElement,
    options: Record<string, string | number | boolean>
  ): void;
}

declare global {
  interface Window {
    google?: { accounts: { id: GoogleIdentity } };
  }
}

function subscribe() {
  return () => {};
}

function getSnapshot() {
  return new URLSearchParams(window.location.search).get("error");
}

function getServerSnapshot() {
  return null;
}

export default function Login() {
  const errorCode = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const error = errorCode ? (MESSAGES[errorCode] ?? "Error al iniciar sesión.") : null;

  const [scriptReady, setScriptReady] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleCredential = useCallback(async (response: CredentialResponse) => {
    if (!response.credential) return;

    setVerifying(true);
    setLoginError(null);

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential: response.credential }),
      });

      if (!res.ok) {
        throw new Error("No se pudo iniciar sesión con Google.");
      }

      const params = new URLSearchParams(window.location.search);
      const next = params.get("next");
      window.location.href = next && next.startsWith("/") ? next : "/perfil";
    } catch (err) {
      setLoginError(
        err instanceof Error ? err.message : "No se pudo iniciar sesión."
      );
      setVerifying(false);
    }
  }, []);

  useEffect(() => {
    if (
      !scriptReady ||
      !GOOGLE_CLIENT_ID_CONFIGURADO ||
      !buttonRef.current ||
      !window.google
    ) {
      return;
    }

    window.google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredential,
    });

    window.google.accounts.id.renderButton(buttonRef.current, {
      theme: "outline",
      size: "large",
      shape: "pill",
      text: "continue_with",
      logo_alignment: "left",
      width: 320,
    });
  }, [scriptReady, handleCredential]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full px-6 py-12">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand">
            Innovate Academy
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground mb-2">
            Iniciar sesión
          </h1>
          <p className="text-sm text-muted">
            Usa tu cuenta de Google para entrar, inscribirte a cursos y ver tu
            panel.
          </p>
        </div>

        {(error || loginError) && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {loginError ?? error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-border p-8 shadow-sm">
          {GOOGLE_CLIENT_ID_CONFIGURADO ? (
            <>
              <Script
                src="https://accounts.google.com/gsi/client"
                strategy="afterInteractive"
                onLoad={() => setScriptReady(true)}
              />
              <div className="flex min-h-[44px] items-center justify-center">
                <div ref={buttonRef} />
              </div>
              {verifying && (
                <p className="mt-4 text-center text-xs text-muted">
                  Verificando tu cuenta de Google...
                </p>
              )}
            </>
          ) : (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <p className="font-semibold">Google Sign-In aún no está configurado.</p>
              <p className="mt-2 text-xs leading-relaxed">
                Falta pegar el Client ID de Google Cloud Console en
                <code className="mx-1 rounded bg-white px-1 py-0.5 text-[11px]">
                  app/lib/google-auth-config.ts
                </code>
                o en la variable{" "}
                <code className="rounded bg-white px-1 py-0.5 text-[11px]">
                  NEXT_PUBLIC_GOOGLE_CLIENT_ID
                </code>
                .
              </p>
            </div>
          )}

          <p className="mt-6 text-xs text-muted text-center">
            Al continuar, aceptas los Términos de Servicio y la Política de
            Privacidad.
          </p>
        </div>
      </div>
    </main>
  );
}
