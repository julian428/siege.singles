import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  //! (finish) add session verification for route protection

  const pathname = request.nextUrl.pathname;
  if (pathname === "/singles")
    return NextResponse.redirect(new URL("/singles/match", request.url));
}

export const config = {
  matcher: "/singles/:path*",
};
