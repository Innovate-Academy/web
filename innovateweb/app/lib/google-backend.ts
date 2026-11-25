// Cliente del backend de Google (Apps Script + Google Sheets).
// Solo se usa desde el servidor: la key nunca llega al navegador.

// Pega aqui la URL del despliegue de Apps Script si no usas variables de
// entorno: "https://script.google.com/macros/s/XXXX/exec"
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL ?? "";
const GOOGLE_SCRIPT_KEY =
  process.env.GOOGLE_SCRIPT_KEY ?? "innovate-academy-google-key";

export class GoogleError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

export function isGoogleConfigured(): boolean {
  return GOOGLE_SCRIPT_URL.startsWith("https://script.google.com/");
}

export interface GoogleEnrollment {
  id: string;
  fecha: string;
  nombre: string;
  email: string;
  curso: string;
  slug: string;
  estado: "En espera" | "Cursando" | "Completado" | string;
  actualizado: string;
}

interface GoogleResponse {
  ok: boolean;
  error?: string;
  [key: string]: unknown;
}

export async function googleRequest<T = Record<string, unknown>>(
  action: string,
  data: Record<string, unknown> = {}
): Promise<T> {
  if (!isGoogleConfigured()) {
    throw new GoogleError(
      "NO_CONFIGURADO",
      "El servicio de Google todavia no esta configurado."
    );
  }

  let response: Response;

  try {
    response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ key: GOOGLE_SCRIPT_KEY, action, ...data }),
      cache: "no-store",
    });
  } catch {
    throw new GoogleError(
      "SIN_CONEXION",
      "No se pudo conectar con Google. Intenta de nuevo."
    );
  }

  const text = await response.text();
  let payload: GoogleResponse;

  try {
    payload = JSON.parse(text) as GoogleResponse;
  } catch {
    throw new GoogleError(
      "RESPUESTA_INVALIDA",
      "Google devolvio una respuesta inesperada."
    );
  }

  if (!response.ok || !payload.ok) {
    throw new GoogleError(
      "ERROR_GOOGLE",
      payload.error ?? "Google no pudo procesar la solicitud."
    );
  }

  return payload as T;
}
