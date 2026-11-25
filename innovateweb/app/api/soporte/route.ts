import { GoogleError, googleRequest } from "@/app/lib/google-backend";

export async function POST(request: Request) {
  let name = "";
  let email = "";
  let message = "";

  try {
    const body = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };
    name = String(body.name ?? "").trim();
    email = String(body.email ?? "").trim();
    message = String(body.message ?? "").trim();
  } catch {
    return Response.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  if (!name || !email || !message) {
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
    await googleRequest("support", { nombre: name, email, mensaje: message });
    return Response.json({ success: true });
  } catch (err) {
    if (err instanceof GoogleError && err.code === "NO_CONFIGURADO") {
      return Response.json(
        {
          error:
            "El soporte todavía no está conectado a Gmail. Avisa al equipo.",
        },
        { status: 503 }
      );
    }

    console.error("Error al enviar soporte por Gmail:", err);

    return Response.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "No se pudo enviar el mensaje. Intenta de nuevo.",
      },
      { status: 502 }
    );
  }
}
