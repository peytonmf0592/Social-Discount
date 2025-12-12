import { AppSidebar } from "@/components/app-sidebar";
import { AppHeader } from "@/components/app-header";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Get actual user and role from auth session
  const mockUser = {
    name: "Demo User",
    email: "demo@example.com",
  };
  const mockRole = "MERCHANT" as const;

  return (
    <div className="flex min-h-screen">
      <AppSidebar role={mockRole} />
      <div className="flex flex-1 flex-col">
        <AppHeader user={mockUser} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
