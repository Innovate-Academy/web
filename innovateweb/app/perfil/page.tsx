"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DiscordUser {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
  email: string | null;
  discriminator: string;
  avatar_url: string | null;
}

export default function Perfil() {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("/api/auth/session", {
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setUser(data.user ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin" />
          <p className="text-muted text-sm">Cargando perfil...</p>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-border flex items-center justify-center mx-auto mb-6">
            <span className="text-muted text-2xl">👤</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            No has iniciado sesión
          </h1>
          <p className="text-muted mb-6">
            Inicia sesión con Discord para ver tu perfil y gestionar tus cursos.
          </p>
          <a
            href="/login"
            className="inline-flex items-center justify-center gap-2 w-full rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
          >
            Iniciar sesión con Discord
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Tu perfil
            </h1>
            <p className="mt-2 text-muted">
              Gestiona tu cuenta y tus cursos en Innovate Academy.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/cursos"
              className="rounded-lg bg-border px-4 py-2.5 text-sm font-medium text-muted hover:bg-gray-100 transition-colors"
            >
              Ver cursos
            </a>
            <button
              onClick={async () => {
                await fetch("/api/auth/logout", { method: "POST" });
                window.location.href = "/";
              }}
              className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-white p-8 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="relative">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.username}
                  className="w-24 h-24 rounded-full object-cover border-4 border-brand"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-4xl font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {user.global_name ?? user.username}
              </h2>
              <p className="mt-1 text-sm text-muted">
                @{user.username}#{user.discriminator}
              </p>
              {user.email && (
                <p className="mt-1 text-sm text-muted">
                  {user.email}
                </p>
              )}
              <p className="mt-2 text-xs text-muted">
                ID de Discord: {user.id}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Tu estado en Innovate Academy
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border border-border bg-gray-50 p-4">
                <p className="text-xs font-semibold text-muted uppercase tracking-wider">
                  Cursos inscritos
                </p>
                <p className="mt-1 text-2xl font-bold text-foreground">0</p>
              </div>
              <div className="rounded-lg border border-brand bg-brand/50 p-4">
                <p className="text-xs font-semibold text-brand uppercase tracking-wider">
                  Miembro de la comunidad
                </p>
                <p className="mt-1 text-sm text-brand">Activo</p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-border bg-gray-50 p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Conectado con Discord
            </h3>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-green-600 font-medium">
                Sesión activa
              </span>
            </div>
            <p className="mt-2 text-xs text-muted">
              Has iniciado sesión con tu cuenta de Discord.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
