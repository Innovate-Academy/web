import { getSession } from "@/app/lib/session";

const PROFESOR_EMAILS = (process.env.PROFESOR_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export async function GET() {
  const user = await getSession();

  if (!user) {
    return Response.json({ user: null, role: null });
  }

  const role = PROFESOR_EMAILS.includes(user.email) ? "profesor" : "alumno";

  return Response.json({
    user,
    role,
    profesor: role === "profesor" ? { nombre: user.name } : null,
  });
}
