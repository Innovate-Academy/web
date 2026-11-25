import Link from "next/link";
import { getSession } from "@/app/lib/session";
import {
  GoogleError,
  googleRequest,
  isGoogleConfigured,
} from "@/app/lib/google-backend";
import type { GoogleEnrollment } from "@/app/lib/google-backend";
import RefreshButton from "../components/RefreshButton";

export const dynamic = "force-dynamic";

const ESTADOS: Record<
  string,
  { etiqueta: string; clase: string; punto: string; descripcion: string }
> = {
  "En espera": {
    etiqueta: "En espera",
    clase: "bg-amber-100 text-amber-800",
    punto: "bg-amber-500",
    descripcion:
      "Recibimos tu inscripción. El equipo la revisará y la activará pronto.",
  },
  Cursando: {
    etiqueta: "Cursando",
    clase: "bg-emerald-100 text-emerald-700",
    punto: "bg-emerald-500",
    descripcion: "Tu curso está activo. ¡A seguir aprendiendo!",
  },
  Completado: {
    etiqueta: "Completado",
    clase: "bg-brand/10 text-brand",
    punto: "bg-brand",
    descripcion: "Terminaste este curso. ¡Felicidades!",
  },
};

async function getEnrollments(email: string): Promise<GoogleEnrollment[]> {
  if (!isGoogleConfigured()) return [];

  try {
    const result = await googleRequest<{ enrollments: GoogleEnrollment[] }>(
      "status",
      { email }
    );

    return result.enrollments ?? [];
  } catch (err) {
    if (!(err instanceof GoogleError)) {
      console.error("Error al cargar inscripciones:", err);
    }
    return [];
  }
}

export default async function MisCursosPage() {
  const user = await getSession();

  if (!user) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-border flex items-center justify-center mx-auto mb-6">
            <span className="text-muted text-2xl">🔒</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Inicia sesión para ver tus cursos
          </h1>
          <p className="text-muted mb-6">
            Entra con tu cuenta de Google para consultar el estado de tus
            inscripciones.
          </p>
          <Link
            href="/login?next=/mis-cursos"
            className="inline-flex items-center justify-center gap-2 w-full rounded-lg bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
          >
            Continuar con Google
          </Link>
        </div>
      </main>
    );
  }

  const enrollments = await getEnrollments(user.email);
  const configurado = isGoogleConfigured();

  const activos = enrollments.filter(
    (item) => item.estado === "Cursando" || item.estado === "Completado"
  ).length;

  return (
    <main className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">
              Mi panel
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
              Mis cursos
            </h1>
            <p className="mt-2 text-sm text-muted">
              {enrollments.length === 0
                ? "Todavía no tienes inscripciones."
                : `${enrollments.length} inscripción${
                    enrollments.length !== 1 ? "es" : ""
                  } · ${activos} activa${activos !== 1 ? "s" : ""}`}
            </p>
          </div>
          <RefreshButton />
        </div>

        {!configurado && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-800">
            El sistema de cursos con Google todavía no está conectado. Cuando el
            equipo termine la configuración, tus inscripciones aparecerán aquí.
          </div>
        )}

        {enrollments.length === 0 ? (
          <div className="rounded-xl border border-border bg-white p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-brand/10 flex items-center justify-center mx-auto mb-6 text-4xl">
              📚
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              No tienes cursos aún
            </h2>
            <p className="text-muted mb-8 max-w-md mx-auto">
              Explora nuestro catálogo, inscríbete con tu cuenta de Google y
              sigue el estado de tu curso desde aquí.
            </p>
            <Link
              href="/cursos"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-hover transition-colors"
            >
              Ver cursos disponibles
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {enrollments.map((item) => {
              const estado = ESTADOS[item.estado] ?? {
                etiqueta: item.estado,
                clase: "bg-gray-100 text-gray-700",
                punto: "bg-gray-400",
                descripcion: "",
              };

              return (
                <article
                  key={item.id}
                  className="rounded-xl border border-border bg-white p-6 transition-colors hover:border-brand/30 hover:shadow-[0_20px_45px_-20px_rgba(15,23,42,0.25)]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-lg font-bold text-foreground">
                          {item.curso}
                        </h2>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${estado.clase}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${estado.punto}`}
                          />
                          {estado.etiqueta}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-muted">
                        {estado.descripcion}
                      </p>
                      <p className="mt-3 text-[11px] text-muted">
                        Inscrito el {formatearFecha(item.fecha)}
                        {item.actualizado && item.actualizado !== item.fecha
                          ? ` · Actualizado el ${formatearFecha(item.actualizado)}`
                          : ""}
                      </p>
                    </div>

                    <div className="flex shrink-0 flex-wrap items-center gap-2">
                      {item.estado === "Cursando" && item.slug && (
                        <Link
                          href={`/cursos/${item.slug}/programa`}
                          className="rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
                        >
                          Ir al curso
                        </Link>
                      )}
                      {item.estado === "Completado" && item.slug && (
                        <Link
                          href={`/cursos/${item.slug}/programa`}
                          className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-gray-50"
                        >
                          Ver programa
                        </Link>
                      )}
                      {item.estado === "En espera" && item.slug && (
                        <Link
                          href={`/cursos/${item.slug}/programa`}
                          className="rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-semibold text-muted transition-colors hover:bg-gray-50"
                        >
                          Ver programa
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
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
