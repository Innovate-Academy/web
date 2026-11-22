import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return new Response(JSON.stringify({ user: null, role: null }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const user = JSON.parse(session.value);
    const discordId = user.id;

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch {
              // Server Components can't modify cookies
            }
          },
        },
      }
    );

    const { data: profesor } = await supabase
      .from("profesores")
      .select("id, nombre")
      .eq("user_id", discordId)
      .single();

    const role = profesor ? "profesor" : "alumno";

    return new Response(JSON.stringify({ user, role, profesor: profesor ?? null }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ user: null, role: null }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}