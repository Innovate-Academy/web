import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const emailHtml = `
      <h2>Nuevo mensaje de soporte</h2>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Correo:</strong> ${email}</p>
      <p><strong>Mensaje:</strong><br>${message}</p>
    `;

    const emailPromise = resend.emails.send({
      from: "Innovate Academy <soporte@resend.dev>",
      to: [process.env.EMAIL_TO!],
      subject: `Nuevo mensaje de soporte de ${name}`,
      html: emailHtml,
    });

    const discordPayload = {
      embeds: [
        {
          title: "📩 Nuevo mensaje de soporte",
          color: 0x3b82f6,
          fields: [
            { name: "Nombre", value: name, inline: true },
            { name: "Correo", value: email, inline: true },
            { name: "Mensaje", value: message },
          ],
          footer: { text: "Innovate Academy - Centro de Soporte" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    const discordPromise = fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    await Promise.all([emailPromise, discordPromise]);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error al enviar soporte:", error);
    return Response.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}
