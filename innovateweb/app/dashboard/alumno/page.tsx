import { redirect } from "next/navigation";
import { getSession } from "@/app/lib/session";

export const dynamic = "force-dynamic";

export default async function AlumnoDashboardPage() {
  const user = await getSession();

  if (!user) {
    redirect("/login?next=/mis-cursos");
  }

  redirect("/mis-cursos");
}
