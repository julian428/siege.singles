import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const isAuth = (await getToken({ req })) as any;

    if (pathname === "/") {
      return NextResponse.next();
    }

    const isOnAuth = pathname.startsWith("/auth");

    const sensitiveRoutes = ["/singles"];
    const isAccessingSensitiveRoutes = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isOnAuth) {
      if (isAuth) {
        return NextResponse.redirect(new URL("/singles/match", req.url));
      }
      return NextResponse.next();
    }

    if (!isAuth && isAccessingSensitiveRoutes) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (pathname === "/singles") {
      return NextResponse.redirect(new URL("/singles/match", req.url));
    }
  },
  {
    callbacks: {
      authorized: async () => true,
    },
  }
);

export const config = {
  matcher: ["/", "/auth", "/auth/verify", "/auth/signup", "/singles/:path*"],
};
