import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  // Public routes - no auth required
  const publicRoutes = ["/", "/login", "/c"];
  const isPublicRoute = publicRoutes.some(
    (route) => nextUrl.pathname === route || nextUrl.pathname.startsWith("/c/")
  );

  // API routes - handle separately
  if (nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Public routes are accessible to everyone
  if (isPublicRoute) {
    // If logged in and trying to access login, redirect to dashboard
    if (isLoggedIn && nextUrl.pathname === "/login") {
      const redirectUrl = getRoleBasedRedirect(userRole);
      return NextResponse.redirect(new URL(redirectUrl, nextUrl));
    }
    return NextResponse.next();
  }

  // Protected routes - require auth
  if (!isLoggedIn) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl)
    );
  }

  // Role-based access control
  const pathname = nextUrl.pathname;

  // Admin routes
  if (pathname.startsWith("/app/admin")) {
    if (userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/app/wallet", nextUrl));
    }
  }

  // Merchant/Business routes
  if (pathname.startsWith("/app/business")) {
    if (userRole !== "MERCHANT" && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/app/wallet", nextUrl));
    }
  }

  return NextResponse.next();
});

function getRoleBasedRedirect(role?: string): string {
  switch (role) {
    case "ADMIN":
      return "/app/admin";
    case "MERCHANT":
      return "/app/business";
    default:
      return "/app/wallet";
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|public).*)",
  ],
};
