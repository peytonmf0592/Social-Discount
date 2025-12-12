import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Only admins can access admin routes
  if (session.user.role !== "ADMIN") {
    redirect("/app/wallet");
  }

  return <>{children}</>;
}
