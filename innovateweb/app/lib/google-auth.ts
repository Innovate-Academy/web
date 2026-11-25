import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_ID_CONFIGURADO } from "./google-auth-config";
import type { SessionUser } from "./session";

interface TokenInfo {
  aud?: string;
  iss?: string;
  sub?: string;
  email?: string;
  email_verified?: string;
  name?: string;
  picture?: string;
  exp?: string;
}

export async function verifyGoogleCredential(
  credential: string
): Promise<SessionUser | null> {
  if (!credential || !GOOGLE_CLIENT_ID_CONFIGURADO) return null;

  let info: TokenInfo;

  try {
    const response = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(
        credential
      )}`,
      { cache: "no-store" }
    );

    if (!response.ok) return null;

    info = (await response.json()) as TokenInfo;
  } catch {
    return null;
  }

  const issuerValido =
    info.iss === "accounts.google.com" ||
    info.iss === "https://accounts.google.com";

  if (
    !issuerValido ||
    info.aud !== GOOGLE_CLIENT_ID ||
    info.email_verified !== "true" ||
    !info.sub ||
    !info.email
  ) {
    return null;
  }

  return {
    id: info.sub,
    email: info.email.toLowerCase(),
    name: info.name ?? info.email.split("@")[0],
    picture: info.picture ?? null,
  };
}
