import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const DISCORD_REDIRECT_URI = process.env.DISCORD_REDIRECT_URI;

export async function GET() {
  if (!DISCORD_CLIENT_ID || !DISCORD_REDIRECT_URI) {
    return new Response("Discord OAuth no configurado", { status: 500 });
  }

  const params = new URLSearchParams({
    client_id: DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: "code",
    scope: "identify email guilds",
  });

  const url = `https://discord.com/api/oauth2/authorize?${params.toString()}`;

  const cookieStore = await cookies();
  cookieStore.set("oauth_state", "discord_login", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
  });

  redirect(url);
}
