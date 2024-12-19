import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
};
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public route

  // Check authentication
  const token = req.cookies.get("access_token");
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}
