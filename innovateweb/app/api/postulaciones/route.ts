import { Resend } from "resend";

const POSTULACIONES_TO =
  process.env.POSTULACIONES_TO ?? "alec.alvarez.lobato@gmail.com";
const POSTULACIONES_FROM =
  process.env.POSTULACIONES_FROM ?? "Innovate Academy <onboarding@resend.dev>";

const PUESTOS = [
  "Administrador",
  "Marketing",
  "Profesor",
  "Staff",
  "Gestor",
];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("Falta la variable de entorno RESEND_API_KEY");
    return Response.json(
      { error: "El envío de correos no está configurado." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const nombre = typeof body.nombre === "string" ? body.nombre.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const puesto = typeof body.puesto === "string" ? body.puesto.trim() : "";

    if (!nombre || !email || !puesto) {
      return Response.json(
        { error: "El nombre, el correo y el puesto son obligatorios." },
        { status: 400 }
      );
    }

    if (nombre.length > 80) {
      return Response.json(
        { error: "El nombre es demasiado largo." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 160) {
      return Response.json(
        { error: "El correo electrónico no es válido." },
        { status: 400 }
      );
    }

    if (!PUESTOS.includes(puesto)) {
      return Response.json(
        { error: "El puesto seleccionado no es válido." },
        { status: 400 }
      );
    }

    const nombreSeguro = escapeHtml(nombre);
    const emailSeguro = escapeHtml(email);
    const puestoSeguro = escapeHtml(puesto);
    const fecha = new Date().toLocaleString("es-ES", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Europe/Madrid",
    });

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: POSTULACIONES_FROM,
      to: [POSTULACIONES_TO],
      replyTo: email,
      subject: `Nueva postulación: ${puesto} — ${nombre}`,
      text: [
        "Nueva postulación en Innovate Academy",
        "",
        `${nombre} se postuló a ${puesto}.`,
        `Correo electrónico: ${email}`,
        `Fecha: ${fecha}`,
      ].join("\n"),
      html: `
        <div style="background:#fbfbf8;padding:32px;font-family:Inter,Arial,Helvetica,sans-serif;color:#171717;">
          <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #ecece6;border-radius:16px;padding:32px;">
            <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#3b82f6;font-weight:700;">
              Innovate Academy · Postulaciones
            </p>
            <h1 style="margin:0 0 24px;font-size:24px;line-height:1.25;">
              Nueva postulación
            </h1>
            <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">
              <strong>${nombreSeguro}</strong> se postuló a
              <strong>${puestoSeguro}</strong>.
            </p>
            <p style="margin:0 0 24px;font-size:14px;line-height:1.6;">
              Correo electrónico:
              <a href="mailto:${emailSeguro}" style="color:#3b82f6;">${emailSeguro}</a>
            </p>
            <p style="margin:0;padding-top:16px;border-top:1px solid #ecece6;font-size:12px;color:#6b7280;">
              Recibida el ${escapeHtml(fecha)}.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "No se pudo enviar la postulación." },
        { status: 502 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error al enviar la postulación:", error);
    return Response.json(
      { error: "No se pudo enviar la postulación." },
      { status: 500 }
    );
  }
}
