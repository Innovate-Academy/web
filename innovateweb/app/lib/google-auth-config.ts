// Configuracion publica de Google Sign-In.
// El Client ID lo entrega Google Cloud Console y es publico por diseno.
// Si no usas variables de entorno en Vercel, pega aqui el valor:
// "1234567890-abc.apps.googleusercontent.com"
export const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ??
  "103625741708-98kg6sqdlhsjhf1bfaadt73q5lpj94ib.apps.googleusercontent.com";

export const GOOGLE_CLIENT_ID_CONFIGURADO =
  GOOGLE_CLIENT_ID.endsWith(".apps.googleusercontent.com") &&
  !GOOGLE_CLIENT_ID.startsWith("PENDIENTE");
