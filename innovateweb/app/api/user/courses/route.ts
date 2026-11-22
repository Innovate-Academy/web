import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) {
    return new Response(JSON.stringify({ courses: [] }), {
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

    const { data: enrollments, error } = await supabase
      .from("inscripciones")
      .select(`
        curso_id,
        creado_en,
        cursos (
          id,
          slug,
          nombre,
          descripcion,
          icono,
          estado,
          duracion_meses,
          precio,
          resultado,
          programas,
          orden,
          dispo
        )
      `)
      .eq("user_id", discordId)
      .order("creado_en", { ascending: false });

    if (error) {
      throw error;
    }

    const courses = (enrollments ?? []).map((e) => e.cursos).filter(Boolean);

    return new Response(JSON.stringify({ courses }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ courses: [] }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}