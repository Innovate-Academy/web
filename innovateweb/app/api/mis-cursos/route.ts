import { getSession } from "@/app/lib/session";
import { GoogleError, googleRequest } from "@/app/lib/google-backend";
import type { GoogleEnrollment } from "@/app/lib/google-backend";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getSession();

  if (!user) {
    return Response.json(
      { error: "No has iniciado sesión.", code: "NO_SESSION" },
      { status: 401 }
    );
  }

  try {
    const result = await googleRequest<{ enrollments: GoogleEnrollment[] }>(
      "status",
      { email: user.email }
    );

    return Response.json({ enrollments: result.enrollments ?? [] });
  } catch (err) {
    if (err instanceof GoogleError && err.code === "NO_CONFIGURADO") {
      return Response.json({ enrollments: [] });
    }

    console.error("Error al leer cursos desde Google:", err);

    return Response.json(
      { error: "No se pudieron cargar tus cursos." },
      { status: 502 }
    );
  }
}
