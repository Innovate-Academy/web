const POSTULACIONES_TO =
  process.env.POSTULACIONES_TO ?? "alec.alvarez.lobato@gmail.com";

const PUESTOS = [
  "Administrador",
  "Marketing",
  "Profesor",
  "Staff",
  "Gestor",
];

export async function POST(req: Request) {
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

    const fecha = new Date().toLocaleString("es-ES", {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "Europe/Madrid",
    });

    const origin =
      req.headers.get("origin") ?? "https://innovateweb.vercel.app";

    const respuesta = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(POSTULACIONES_TO)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: origin,
          Referer: `${origin}/`,
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({
          _subject: `Nueva postulación: ${puesto} — ${nombre}`,
          _template: "table",
          _replyto: email,
          Nombre: nombre,
          Puesto: puesto,
          Correo: email,
          Mensaje: `${nombre} se postuló a ${puesto}. Correo electrónico: ${email}`,
          Fecha: fecha,
        }),
      }
    );

    const datos = await respuesta.json().catch(() => null);
    const exito = datos?.success === true || datos?.success === "true";

    if (!respuesta.ok || !exito) {
      console.error("FormSubmit error:", respuesta.status, datos);
      return Response.json(
        {
          error: `No se pudo enviar la postulación. ${
            datos?.message ?? `HTTP ${respuesta.status}`
          }`,
        },
        { status: 502 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error al enviar la postulación:", error);
    return Response.json(
      {
        error: `No se pudo enviar: ${
          error instanceof Error ? error.message : "error desconocido"
        }`,
      },
      { status: 500 }
    );
  }
}
