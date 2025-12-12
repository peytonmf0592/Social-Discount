import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function BusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Only merchants and admins can access business routes
  if (session.user.role !== "MERCHANT" && session.user.role !== "ADMIN") {
    redirect("/app/wallet");
  }

  return <>{children}</>;
}
