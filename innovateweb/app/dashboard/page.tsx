import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";

export const dynamic = "force-dynamic";

const PROFESOR_EMAILS = (process.env.PROFESOR_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export default async function DashboardPage() {
  const user = await getSession();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  if (PROFESOR_EMAILS.includes(user.email)) {
    redirect("/dashboard/profesor");
  }

  redirect("/mis-cursos");
}
