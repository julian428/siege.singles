import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname === "/singles")
    return NextResponse.redirect(new URL("/singles/match", request.url));
}

export const config = {
  matcher: "/singles/:path*",
};
