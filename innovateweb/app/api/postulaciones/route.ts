import { GoogleError, googleRequest } from "@/app/lib/google-backend";

export async function POST(request: Request) {
  let nombre = "";
  let email = "";
  let puesto = "";

  try {
    const body = (await request.json()) as {
      nombre?: string;
      email?: string;
      puesto?: string;
    };
    nombre = String(body.nombre ?? "").trim();
    email = String(body.email ?? "").trim();
    puesto = String(body.puesto ?? "").trim();
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  if (!nombre || !email || !puesto) {
    return Response.json(
      { error: "Faltan campos requeridos." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: "El correo no es válido." },
      { status: 400 }
    );
  }

  try {
    await googleRequest("apply", { nombre, email, puesto });
    return Response.json({ success: true });
  } catch (err) {
    if (err instanceof GoogleError && err.code === "NO_CONFIGURADO") {
      return Response.json(
        {
          error:
            "Las postulaciones todavía no están conectadas a Gmail. Avisa al equipo.",
        },
        { status: 503 }
      );
    }

    console.error("Error al enviar postulación por Gmail:", err);

    return Response.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "No se pudo enviar la postulación. Intenta de nuevo.",
      },
      { status: 502 }
    );
  }
}
