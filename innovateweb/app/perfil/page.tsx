"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string | null;
}

interface Enrollment {
  id: string;
  fecha: string;
  nombre: string;
  email: string;
  curso: string;
  slug: string;
  estado: string;
  actualizado: string;
}

const ESTADO_CLASE: Record<string, string> = {
  "En espera": "bg-amber-100 text-amber-800",
  Cursando: "bg-emerald-100 text-emerald-700",
  Completado: "bg-brand/10 text-brand",
};

export default function Perfil() {
  const [user, setUser] = useState<GoogleUser | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
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
        const res = await fetch("/api/mis-cursos", {
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        });
        const data = await res.json();
        setEnrollments(data.enrollments ?? []);
      } catch {
        setEnrollments([]);
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
            Entra con tu cuenta de Google para ver tu perfil y gestionar tus
            cursos.
          </p>
          <Link
            href="/login?next=/perfil"
            className="inline-flex items-center justify-center gap-2 w-full rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
          >
            Continuar con Google
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Tu perfil
            </h1>
            <p className="mt-2 text-muted">
              Gestiona tu cuenta y tus cursos en Innovate Academy.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/cursos"
              className="rounded-lg bg-border px-4 py-2.5 text-sm font-medium text-muted hover:bg-gray-100 transition-colors"
            >
              Ver cursos
            </Link>
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
            {user.picture ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.picture}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-brand"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-brand/10 flex items-center justify-center text-brand text-4xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-2xl font-bold text-foreground truncate">
                {user.name}
              </h2>
              <p className="mt-1 text-sm text-muted truncate">{user.email}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-700">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                Cuenta de Google
              </span>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">
                Tus cursos inscritos
              </h3>
              <Link
                href="/mis-cursos"
                className="text-xs font-semibold text-brand hover:text-brand-hover"
              >
                Ver panel completo →
              </Link>
            </div>

            {coursesLoading ? (
              <div className="flex items-center justify-center gap-3 text-sm text-muted py-8">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand border-t-transparent" />
                Cargando cursos...
              </div>
            ) : enrollments.length === 0 ? (
              <div className="mt-4 rounded-lg border border-border bg-gray-50 p-8 text-center">
                <p className="font-semibold text-foreground">
                  No tienes cursos inscritos
                </p>
                <p className="mt-2 text-sm text-muted">
                  Explora el catálogo e inscríbete en tu primer curso.
                </p>
                <Link
                  href="/cursos"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
                >
                  Ver cursos disponibles
                </Link>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-4">
                {enrollments.map((item) => (
                  <article
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-border bg-white p-6"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-foreground">
                          {item.curso}
                        </h4>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                            ESTADO_CLASE[item.estado] ??
                            "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {item.estado}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        Inscrito el {formatearFecha(item.fecha)}
                      </p>
                    </div>
                    <Link
                      href={item.slug ? `/cursos/${item.slug}/programa` : "/cursos"}
                      className="rounded-lg bg-border px-4 py-2 text-sm font-medium text-muted hover:bg-gray-100 transition-colors"
                    >
                      Ver programa
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 rounded-lg border border-border bg-gray-50 p-6">
            <h3 className="text-lg font-bold text-foreground mb-4">
              Conectado con Google
            </h3>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-sm text-green-600 font-medium">
                Sesión activa
              </span>
            </div>
            <p className="mt-2 text-xs text-muted">
              Has iniciado sesión con tu cuenta de Google. Las inscripciones y
              avisos se envían a {user.email}.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function formatearFecha(valor: string): string {
  if (!valor) return "—";

  const fecha = new Date(valor);

  if (Number.isNaN(fecha.getTime())) return valor;

  return fecha.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
