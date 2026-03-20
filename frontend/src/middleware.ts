import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "nexacare_auth";
const ROLE_COOKIE = "nexacare_role";

function isProtectedPath(pathname: string) {
  return pathname.startsWith("/dashboard") || pathname === "/doctor";
}

export function middleware(req: NextRequest) {
  if (!isProtectedPath(req.nextUrl.pathname)) return NextResponse.next();

  const auth = req.cookies.get(AUTH_COOKIE)?.value;
  if (auth !== "1") {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = req.cookies.get(ROLE_COOKIE)?.value;
  if (!role) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/doctor"],
};

