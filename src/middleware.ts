import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    const isAuth = (await getToken({ req })) as any;
    console.log(isAuth);

    if (pathname === "/") {
      return NextResponse.next();
    }

    const firstAuthPages = ["/auth", "/auth/signup"];
    const sensitiveRoutes = ["/singles"];

    const accessingVerificationPage = pathname === "/auth/verify";
    const accessingAuthPages = firstAuthPages.some((page) => pathname === page);
    const accessingSensitiveRoutes = sensitiveRoutes.some((route) =>
      pathname.startsWith(route)
    );

    if (isAuth && !isAuth.active && !accessingVerificationPage) {
      return NextResponse.redirect(new URL("/auth/verify", req.url));
    }

    if (isAuth && isAuth.active && accessingVerificationPage) {
      return NextResponse.redirect(new URL("/singles/match", req.url));
    }

    if ((accessingSensitiveRoutes || accessingVerificationPage) && !isAuth) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }

    if (accessingAuthPages && isAuth) {
      return NextResponse.redirect(new URL("/singles/match", req.url));
    }

    if (pathname === "/singles") {
      return NextResponse.redirect(new URL("/singles/match", req.url));
    }

    return NextResponse.next();
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
