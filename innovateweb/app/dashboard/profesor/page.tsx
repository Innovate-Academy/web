import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";

export const dynamic = "force-dynamic";

const PROFESOR_EMAILS = (process.env.PROFESOR_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export default async function ProfesorDashboardPage() {
  const user = await getSession();

  if (!user) {
    redirect("/login?next=/dashboard/profesor");
  }

  if (!PROFESOR_EMAILS.includes(user.email)) {
    redirect("/mis-cursos");
  }

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">
          Panel de profesor
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Hola, {user.name}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
          La gestión de inscripciones se hace desde los correos que llegan a
          Gmail y desde la hoja de cálculo de Google. Cada inscripción incluye
          botones para activarla o marcarla como completada.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-sm font-bold">Activar una inscripción</h2>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Abre el correo de la inscripción y pulsa{" "}
              <strong className="text-foreground">Activar curso</strong>. El
              alumno verá el estado actualizado en su panel.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-white p-6">
            <h2 className="text-sm font-bold">Ver todas las inscripciones</h2>
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Todas quedan guardadas en la hoja de cálculo de Google del
              proyecto, con su estado actual.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/mis-cursos"
            className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
          >
            Ver mis cursos
          </Link>
          <Link
            href="/cursos"
            className="rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold transition-colors hover:bg-panel"
          >
            Ver catálogo
          </Link>
        </div>
      </div>
    </main>
  );
}
