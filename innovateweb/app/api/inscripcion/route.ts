import { getSession } from "@/app/lib/session";
import { GoogleError, googleRequest } from "@/app/lib/google-backend";
import type { GoogleEnrollment } from "@/app/lib/google-backend";

export async function POST(request: Request) {
  const user = await getSession();

  if (!user) {
    return Response.json(
      {
        error: "Inicia sesión con Google para inscribirte a un curso.",
        code: "NO_SESSION",
      },
      { status: 401 }
    );
  }

  let cursoNombre = "";
  let cursoSlug = "";

  try {
    const body = (await request.json()) as {
      cursoNombre?: string;
      cursoSlug?: string;
    };
    cursoNombre = String(body.cursoNombre ?? "").trim();
    cursoSlug = String(body.cursoSlug ?? "").trim();
  } catch {
    return Response.json(
      { error: "Solicitud inválida." },
      { status: 400 }
    );
  }

  if (!cursoNombre) {
    return Response.json(
      { error: "Falta el curso al que te quieres inscribir." },
      { status: 400 }
    );
  }

  try {
    const result = await googleRequest<{ enrollment: GoogleEnrollment }>(
      "enroll",
      {
        nombre: user.name,
        email: user.email,
        curso: cursoNombre,
        slug: cursoSlug,
      }
    );

    return Response.json({ success: true, enrollment: result.enrollment });
  } catch (err) {
    if (err instanceof GoogleError && err.code === "NO_CONFIGURADO") {
      return Response.json(
        {
          error:
            "Las inscripciones todavía no están conectadas a Google. Avisa al equipo.",
        },
        { status: 503 }
      );
    }

    console.error("Error al inscribir en Google:", err);

    return Response.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "No se pudo enviar la inscripción. Intenta de nuevo.",
      },
      { status: 502 }
    );
  }
}
