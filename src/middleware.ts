import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get session token from cookies
  const sessionToken =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value;

  const isLoggedIn = !!sessionToken;

  // Public routes - no auth required
  const publicRoutes = ["/", "/login", "/c"];
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith("/c/")
  );

  // API routes - handle separately
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Static files and assets
  if (
    pathname.startsWith("/_next") ||
    pathname.includes(".") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Public routes are accessible to everyone
  if (isPublicRoute) {
    // If logged in and trying to access login, redirect to app
    if (isLoggedIn && pathname === "/login") {
      return NextResponse.redirect(new URL("/app/wallet", request.url));
    }
    return NextResponse.next();
  }

  // Protected routes - require auth
  if (!isLoggedIn) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${callbackUrl}`, request.url)
    );
  }

  // Role-based access is handled at the page level
  // since we can't decode JWT without the secret in Edge
  return NextResponse.next();
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
