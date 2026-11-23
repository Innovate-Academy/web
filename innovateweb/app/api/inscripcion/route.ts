import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, discord, cursoNombre, cursoSlug } = body;

    if (!name || !email || !cursoNombre) {
      return Response.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const discordPayload = {
      embeds: [
        {
          title: "📋 Nueva inscripción a curso",
          color: 0x3b82f6,
          fields: [
            { name: "Nombre", value: name, inline: true },
            { name: "Correo", value: email, inline: true },
            { name: "Discord", value: discord || "No proporcionado", inline: true },
            { name: "Curso", value: cursoNombre, inline: false },
          ],
          footer: { text: "Innovate Academy - Inscripciones" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordPayload),
      });

      if (!response.ok) {
        console.error("Discord webhook error:", response.status);
      }
    }

    // Envío por correo si está configurado Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: "Innovate Academy <onboarding@resend.dev>",
          to: process.env.INSCRIPCION_EMAIL || "contacto@innovateacademy.com",
          subject: `Nueva inscripción: ${cursoNombre}`,
          html: `
            <h2>Nueva inscripción a curso</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Correo:</strong> ${email}</p>
            <p><strong>Discord:</strong> ${discord || "No proporcionado"}</p>
            <p><strong>Curso:</strong> ${cursoNombre}</p>
            <p><strong>Slug:</strong> ${cursoSlug || ""}</p>
          `,
        });
      } catch (err) {
        console.error("Resend error:", err);
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error al procesar inscripción:", error);
    return Response.json(
      { error: "Error al enviar la inscripción" },
      { status: 500 }
    );
  }
}
