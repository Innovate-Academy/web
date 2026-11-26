/**
 * Innovate Academy — Backend de Google
 * -------------------------------------
 * Este script guarda las inscripciones en una hoja de Google y envía todos
 * los correos con Gmail.
 *
 * Instalación (una sola vez): ver GOOGLE_SETUP.md en el repositorio.
 */

const ADMIN_EMAILS = [
  "alec.alvarez.lobato@gmail.com",
  "innovatesoporte2026@gmail.com",
];

// Debe coincidir con GOOGLE_SCRIPT_KEY del sitio web.
const API_KEY = "innovate-academy-google-key";

const SHEET_TITLE = "Innovate Academy — Inscripciones";
const SHEET_PROP = "INSCRIPCIONES_SHEET_ID";
const TAB_NAME = "Inscripciones";
const HEADERS = [
  "ID",
  "Fecha",
  "Nombre",
  "Correo",
  "Curso",
  "Slug",
  "Estado",
  "Actualizado",
];

const ESTADOS = {
  ESPERA: "En espera",
  CURSANDO: "Cursando",
  COMPLETADO: "Completado",
};

/* ------------------------------------------------------------------ */
/* Instalación                                                         */
/* ------------------------------------------------------------------ */

/**
 * Ejecuta esta función una vez desde el editor de Apps Script.
 * Crea la hoja de cálculo, guarda su ID y envía el enlace a los admins.
 */
function setup() {
  const props = PropertiesService.getScriptProperties();
  let id = props.getProperty(SHEET_PROP);
  let ss = null;

  if (id) {
    try {
      ss = SpreadsheetApp.openById(id);
    } catch (err) {
      ss = null;
    }
  }

  if (!ss) {
    ss = SpreadsheetApp.create(SHEET_TITLE);
    id = ss.getId();
    props.setProperty(SHEET_PROP, id);
  }

  let sheet = ss.getSheetByName(TAB_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(TAB_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.getRange("A:H").setNumberFormat("@");
  }

  MailApp.sendEmail({
    to: ADMIN_EMAILS.join(","),
    subject: "Innovate Academy — Hoja de inscripciones creada",
    htmlBody:
      "<p>La hoja de inscripciones ya está lista.</p>" +
      '<p><a href="' +
      ss.getUrl() +
      '">Abrir Google Sheet</a></p>',
  });

  return ss.getUrl();
}

/* ------------------------------------------------------------------ */
/* API                                                                 */
/* ------------------------------------------------------------------ */

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    if (data.key !== API_KEY) {
      return json_({ ok: false, error: "No autorizado." });
    }

    switch (data.action) {
      case "enroll":
        return json_(enroll_(data));
      case "status":
        return json_({ ok: true, enrollments: status_(data.email) });
      case "support":
        return json_(support_(data));
      case "apply":
        return json_(apply_(data));
      case "ping":
        return json_({ ok: true, mensaje: "Conectado con Google." });
      default:
        return json_({ ok: false, error: "Acción desconocida." });
    }
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  const params = (e && e.parameter) || {};
  const action = params.action;

  if (action === "activate" || action === "complete") {
    return manageEnrollment_(params.id, params.token, action);
  }

  if (action === "ping") {
    return ContentService.createTextOutput("Innovate Academy: conectado.");
  }

  return htmlPage_(
    "Enlace inválido",
    "<p>Este enlace no es válido. Revisa el correo original.</p>"
  );
}

/* ------------------------------------------------------------------ */
/* Acciones                                                            */
/* ------------------------------------------------------------------ */

function enroll_(data) {
  const nombre = String(data.nombre || "").trim();
  const email = String(data.email || "").trim().toLowerCase();
  const curso = String(data.curso || "").trim();
  const slug = String(data.slug || "").trim();

  if (!nombre || !email || !curso) {
    return { ok: false, error: "Faltan datos de la inscripción." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "El correo no es válido." };
  }

  const sheet = getSheet_();
  const existente = findEnrollment_(sheet, email, slug);

  if (existente) {
    return { ok: true, enrollment: existente };
  }

  const ahora = new Date().toISOString();
  const id = Utilities.getUuid();

  sheet.appendRow([
    id,
    ahora,
    nombre,
    email,
    curso,
    slug,
    ESTADOS.ESPERA,
    ahora,
  ]);

  const enrollment = {
    id: id,
    fecha: ahora,
    nombre: nombre,
    email: email,
    curso: curso,
    slug: slug,
    estado: ESTADOS.ESPERA,
    actualizado: ahora,
  };

  enviarAvisoInscripcion_(enrollment);

  return { ok: true, enrollment: enrollment };
}

function support_(data) {
  const nombre = String(data.nombre || "").trim();
  const email = String(data.email || "").trim();
  const mensaje = String(data.mensaje || "").trim();

  if (!nombre || !email || !mensaje) {
    return { ok: false, error: "Faltan datos del mensaje." };
  }

  MailApp.sendEmail({
    to: ADMIN_EMAILS.join(","),
    replyTo: email,
    subject: "Soporte — " + nombre,
    htmlBody: template_(
      "Nuevo mensaje de soporte",
      [
        ["Nombre", nombre],
        ["Correo", email],
        ["Fecha", formatearFecha_(new Date())],
      ],
      "<p style=\"white-space:pre-wrap\">" + escapar_(mensaje) + "</p>"
    ),
  });

  return { ok: true };
}

function apply_(data) {
  const nombre = String(data.nombre || "").trim();
  const email = String(data.email || "").trim();
  const puesto = String(data.puesto || "").trim();

  if (!nombre || !email || !puesto) {
    return { ok: false, error: "Faltan datos de la postulación." };
  }

  MailApp.sendEmail({
    to: ADMIN_EMAILS.join(","),
    replyTo: email,
    subject: "Postulación: " + puesto + " — " + nombre,
    htmlBody: template_(
      "Nueva postulación",
      [
        ["Nombre", nombre],
        ["Correo", email],
        ["Puesto", puesto],
        ["Fecha", formatearFecha_(new Date())],
      ],
      "<p><strong>" +
        escapar_(nombre) +
        "</strong> se postuló a <strong>" +
        escapar_(puesto) +
        "</strong>.</p>"
    ),
  });

  return { ok: true };
}

function status_(email) {
  const buscado = String(email || "").trim().toLowerCase();

  if (!buscado) return [];

  const sheet = getSheet_();
  const values = sheet.getDataRange().getDisplayValues();

  if (values.length < 2) return [];

  const salida = [];

  for (let i = 1; i < values.length; i++) {
    const fila = values[i];

    if (String(fila[3]).trim().toLowerCase() !== buscado) continue;

    salida.push({
      id: fila[0],
      fecha: fila[1],
      nombre: fila[2],
      email: fila[3],
      curso: fila[4],
      slug: fila[5],
      estado: fila[6],
      actualizado: fila[7],
    });
  }

  salida.reverse();

  return salida;
}

/* ------------------------------------------------------------------ */
/* Activación desde el correo                                          */
/* ------------------------------------------------------------------ */

function manageEnrollment_(id, token, action) {
  const sheet = getSheet_();
  const values = sheet.getDataRange().getValues();

  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0]) !== String(id)) continue;

    if (!tokenValido_(String(id), String(token))) {
      return htmlPage_(
        "Enlace no válido",
        "<p>El enlace de activación no es correcto.</p>"
      );
    }

    const estado =
      action === "complete" ? ESTADOS.COMPLETADO : ESTADOS.CURSANDO;

    sheet.getRange(i + 1, 7).setValue(estado);
    sheet.getRange(i + 1, 8).setValue(new Date().toISOString());

    const alumno = String(values[i][3]);
    const curso = String(values[i][4]);

    if (alumno && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(alumno)) {
      enviarAvisoEstado_(alumno, curso, estado);
    }

    return htmlPage_(
      estado === ESTADOS.COMPLETADO ? "Curso completado" : "Curso activado",
      "<p><strong>" +
        escapar_(curso) +
        "</strong> pasó a estado <strong>" +
        estado +
        "</strong>.</p>" +
        "<p>El alumno ya puede ver el cambio en su panel.</p>" +
        '<p><a href="' +
        getSheet_().getParent().getUrl() +
        '">Abrir la hoja de inscripciones</a></p>'
    );
  }

  return htmlPage_(
    "Inscripción no encontrada",
    "<p>No encontramos esta inscripción en la hoja.</p>"
  );
}

function tokenValido_(id, token) {
  const esperado = firma_(id);

  if (esperado.length !== token.length) return false;

  let diferencia = 0;

  for (let i = 0; i < esperado.length; i++) {
    diferencia |= esperado.charCodeAt(i) ^ token.charCodeAt(i);
  }

  return diferencia === 0;
}

function firma_(id) {
  const bytes = Utilities.computeHmacSha256Signature(id, API_KEY);
  return bytes
    .map(function (b) {
      return ("0" + (b & 0xff).toString(16)).slice(-2);
    })
    .join("");
}

/* ------------------------------------------------------------------ */
/* Correos                                                             */
/* ------------------------------------------------------------------ */

function enviarAvisoInscripcion_(enrollment) {
  const url = ScriptApp.getService().getUrl();
  const activar =
    url +
    "?action=activate&id=" +
    encodeURIComponent(enrollment.id) +
    "&token=" +
    firma_(enrollment.id);
  const completar =
    url +
    "?action=complete&id=" +
    encodeURIComponent(enrollment.id) +
    "&token=" +
    firma_(enrollment.id);
  const hoja = getSheet_().getParent().getUrl();

  const botones =
    '<p style="margin:24px 0">' +
    '<a href="' +
    activar +
    '" style="background:#3b82f6;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;margin-right:8px">Activar curso</a>' +
    '<a href="' +
    completar +
    '" style="background:#e5e7eb;color:#111;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block">Marcar completado</a>' +
    "</p>" +
    '<p style="font-size:12px;color:#6b7280">También puedes editar el estado directamente en la hoja: <a href="' +
    hoja +
    '">abrir hoja</a>.</p>';

  MailApp.sendEmail({
    to: ADMIN_EMAILS.join(","),
    replyTo: enrollment.email,
    subject: "Nueva inscripción: " + enrollment.curso + " — " + enrollment.nombre,
    htmlBody: template_(
      "Nueva inscripción a curso",
      [
        ["Nombre", enrollment.nombre],
        ["Correo", enrollment.email],
        ["Curso", enrollment.curso],
        ["Estado", enrollment.estado],
        ["Fecha", formatearFecha_(new Date(enrollment.fecha))],
      ],
      "<p><strong>" +
        escapar_(enrollment.nombre) +
        "</strong> se inscribió a <strong>" +
        escapar_(enrollment.curso) +
        "</strong>.</p>" +
        botones
    ),
  });
}

function enviarAvisoEstado_(email, curso, estado) {
  const mensaje =
    estado === ESTADOS.COMPLETADO
      ? "¡Felicidades! Tu curso <strong>" +
        escapar_(curso) +
        "</strong> quedó marcado como <strong>Completado</strong>."
      : "Tu inscripción a <strong>" +
        escapar_(curso) +
        "</strong> ya está <strong>activa</strong>. ¡Puedes empezar cuando quieras!";

  MailApp.sendEmail({
    to: email,
    subject:
      estado === ESTADOS.COMPLETADO
        ? "Curso completado: " + curso
        : "Tu curso está activo: " + curso,
    htmlBody: template_("Innovate Academy", [["Curso", curso], ["Estado", estado]], "<p>" + mensaje + "</p>"),
  });
}

/* ------------------------------------------------------------------ */
/* Utilidades                                                          */
/* ------------------------------------------------------------------ */

function getSheet_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty(SHEET_PROP);

  if (!id) {
    throw new Error("Falta ejecutar setup() una vez en Apps Script.");
  }

  const ss = SpreadsheetApp.openById(id);
  let sheet = ss.getSheetByName(TAB_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(TAB_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange("A:H").setNumberFormat("@");
  }

  return sheet;
}

function findEnrollment_(sheet, email, slug) {
  const values = sheet.getDataRange().getDisplayValues();

  for (let i = 1; i < values.length; i++) {
    const fila = values[i];
    const mismoEmail =
      String(fila[3]).trim().toLowerCase() === String(email).toLowerCase();
    const mismoSlug = String(fila[5]).trim() === String(slug).trim();

    if (mismoEmail && mismoSlug) {
      return {
        id: fila[0],
        fecha: fila[1],
        nombre: fila[2],
        email: fila[3],
        curso: fila[4],
        slug: fila[5],
        estado: fila[6],
        actualizado: fila[7],
      };
    }
  }

  return null;
}

function template_(titulo, filas, cuerpoHtml) {
  const filasHtml = filas
    .map(function (fila) {
      return (
        '<tr><td style="padding:6px 12px 6px 0;color:#6b7280;font-size:13px">' +
        escapar_(fila[0]) +
        '</td><td style="padding:6px 0;font-size:13px"><strong>' +
        escapar_(fila[1]) +
        "</strong></td></tr>"
      );
    })
    .join("");

  return (
    '<div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;color:#111">' +
    '<h2 style="margin:0 0 16px">' +
    escapar_(titulo) +
    "</h2>" +
    '<table style="border-collapse:collapse;margin-bottom:16px">' +
    filasHtml +
    "</table>" +
    cuerpoHtml +
    '<p style="margin-top:28px;font-size:11px;color:#9ca3af">Innovate Academy · Enviado desde Gmail</p>' +
    "</div>"
  );
}

function htmlPage_(titulo, contenido) {
  return HtmlService.createHtmlOutput(
    '<!doctype html><html lang="es"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1">' +
      "<title>" +
      escapar_(titulo) +
      "</title></head>" +
      '<body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#fbfbf8;font-family:Arial,Helvetica,sans-serif;color:#111;padding:24px">' +
      '<div style="max-width:480px;background:#fff;border:1px solid #ecece6;border-radius:16px;padding:32px;text-align:center">' +
      '<div style="width:52px;height:52px;border-radius:50%;background:#dcfce7;color:#16a34a;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:26px">✓</div>' +
      "<h1 style=\"font-size:22px;margin:0 0 12px\">" +
      escapar_(titulo) +
      "</h1>" +
      '<div style="font-size:14px;line-height:1.6;color:#555">' +
      contenido +
      "</div>" +
      '<p style="margin-top:24px"><a href="https://innovateweb.vercel.app/mis-cursos" style="color:#3b82f6;font-weight:600">Ir a Innovate Academy</a></p>' +
      "</div></body></html>"
  );
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function escapar_(valor) {
  return String(valor)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatearFecha_(fecha) {
  return Utilities.formatDate(
    fecha,
    Session.getScriptTimeZone(),
    "dd/MM/yyyy HH:mm"
  );
}

/**
 * Envía un correo de prueba a los admins.
 * Ejecútala manualmente para comprobar Gmail.
 */
function enviarPrueba() {
  MailApp.sendEmail({
    to: ADMIN_EMAILS.join(","),
    subject: "Innovate Academy — Prueba de Gmail",
    htmlBody: "<p>Si ves este correo, Gmail ya está conectado con la academia.</p>",
  });
}
