"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const BUTTON =
  "rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-brand/30 hover:bg-panel";

export default function HomeActions() {
  const [mostrarLogin, setMostrarLogin] = useState(true);

  useEffect(() => {
    let activo = true;

    fetch("/api/auth/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((data: { user?: unknown }) => {
        if (activo) setMostrarLogin(!data.user);
      })
      .catch(() => {
        if (activo) setMostrarLogin(true);
      });

    return () => {
      activo = false;
    };
  }, []);

  return (
    <div className="mt-7 flex flex-wrap items-center gap-3">
      <Link
        href="/cursos"
        className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
      >
        Ver cursos
      </Link>
      {mostrarLogin ? (
        <Link href="/login" className={BUTTON}>
          Iniciar sesión con Google
        </Link>
      ) : null}
      <Link href="/postula" className={BUTTON}>
        Únete a nuestro Equipo
      </Link>
    </div>
  );
}
