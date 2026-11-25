import { cookies } from "next/headers";
import { verifyGoogleCredential } from "@/app/lib/google-auth";
import {
  SESSION_COOKIE,
  serializeSession,
  sessionCookieOptions,
} from "@/app/lib/session";

export async function POST(request: Request) {
  let credential = "";

  try {
    const body = (await request.json()) as { credential?: string };
    credential = body.credential ?? "";
  } catch {
    return Response.json(
      { error: "Solicitud invalida." },
      { status: 400 }
    );
  }

  const user = await verifyGoogleCredential(credential);

  if (!user) {
    return Response.json(
      { error: "No se pudo verificar la cuenta de Google." },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, serializeSession(user), sessionCookieOptions());

  return Response.json({ success: true, user });
}
