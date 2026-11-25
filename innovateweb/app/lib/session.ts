import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  picture: string | null;
}

interface SessionPayload extends SessionUser {
  iat: number;
}

export const SESSION_COOKIE = "session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 30;

const SECRET =
  process.env.SESSION_SECRET ??
  "1438e89c17a4a0d5760c0e23651179e06b209a7d4bd37e3f0ae1c46bc75474f2";

function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("base64url");
}

export function serializeSession(user: SessionUser): string {
  const payload: SessionPayload = {
    ...user,
    iat: Math.floor(Date.now() / 1000),
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${encoded}.${sign(encoded)}`;
}

export function parseSession(value: string): SessionUser | null {
  const [encoded, signature] = value.split(".");

  if (!encoded || !signature) return null;

  const expected = sign(encoded);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);

  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8")
    ) as SessionPayload;

    if (!payload.id || !payload.email || !payload.name) return null;

    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      picture: payload.picture ?? null,
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE);

  if (!cookie) return null;

  return parseSession(cookie.value);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_MAX_AGE,
  };
}
