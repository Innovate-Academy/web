import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

async function getRole(): Promise<string | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) return null;

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
      .select("id")
      .eq("user_id", discordId)
      .single();

    return profesor ? "profesor" : "alumno";
  } catch {
    return null;
  }
}

export default async function AlumnoDashboardPage() {
  const role = await getRole();

  if (role === "profesor") {
    redirect("/dashboard/profesor");
  }

  redirect("/mis-cursos");
}