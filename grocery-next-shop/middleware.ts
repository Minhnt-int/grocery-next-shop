import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authCookieName, verifyAdminToken } from "@/lib/auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/login-admin") || pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get(authCookieName)?.value;
    const session = token ? verifyAdminToken(token) : null;

    if (!session) {
      const loginUrl = new URL("/login-admin", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/login-admin"],
};
