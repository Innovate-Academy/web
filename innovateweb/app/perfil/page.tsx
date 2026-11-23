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

interface Curso {
  id: number | string;
  slug: string;
  nombre: string;
  descripcion: string;
  icono: string;
  estado: string;
  duracion_meses: number;
  precio: string;
  resultado: string;
  programas: string[];
  orden: number;
  dispo: boolean;
}

export default function Perfil() {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [courses, setCourses] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [coursesLoading, setCoursesLoading] = useState(true);

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

  useEffect(() => {
    if (!user) return;

    async function fetchCourses() {
      setCoursesLoading(true);
      try {
        const res = await fetch("/api/user/courses", {
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setCourses(data.courses ?? []);
      } catch {
        setCourses([]);
      } finally {
        setCoursesLoading(false);
      }
    }

    fetchCourses();
  }, [user]);

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
              Tus cursos inscritos
            </h3>
            {coursesLoading ? (
              <div className="flex items-center justify-center gap-3 text-sm text-muted py-8">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                Cargando cursos...
              </div>
            ) : courses.length === 0 ? (
              <div className="rounded-lg border border-border bg-gray-50 p-8 text-center">
                <p className="font-semibold text-foreground">No tienes cursos inscritos</p>
                <p className="mt-2 text-sm text-muted">
                  Explora el catálogo e inscríbete en tus primeros cursos.
                </p>
                <Link
                  href="/cursos"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
                >
                  Ver cursos disponibles
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {courses.map((curso) => (
                  <article
                    key={curso.id}
                    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-border bg-white p-6 transition-colors ${
                      !curso.dispo ? "opacity-70" : ""
                    }`}
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                        <span className="text-2xl">{curso.icono || "📚"}</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-foreground truncate">
                          {curso.nombre}
                        </h4>
                        <p className="mt-1 text-sm text-muted truncate">
                          {curso.descripcion}
                        </p>
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted">
                          <span>{curso.duracion_meses} meses</span>
                          <span className="font-semibold text-foreground">
                            ${curso.precio}
                          </span>
                          {!curso.dispo && (
                            <span className="text-red-600 font-medium">No disponible</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`/cursos/${curso.slug}`}
                        className="rounded-lg bg-border px-4 py-2 text-sm font-medium text-muted hover:bg-gray-100 transition-colors"
                      >
                        Ver curso
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            )}
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
