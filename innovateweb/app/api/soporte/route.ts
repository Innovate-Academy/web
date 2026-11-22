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

    const response = await fetch(process.env.DISCORD_WEBHOOK_URL!, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) {
      console.error("Discord webhook error:", response.status);
      return Response.json(
        { error: "Error al enviar a Discord" },
        { status: 500 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error al enviar soporte:", error);
    return Response.json(
      { error: "Error al enviar el mensaje" },
      { status: 500 }
    );
  }
}
