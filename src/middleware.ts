import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login", "/signup", "/"];
const PRIVATE_ROUTES = ["/transactions", "/add-report", "/home"];

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("auth_session")?.value;

  //Redirect to home if user exist and i`m in public route
  if (currentUser && PUBLIC_ROUTES.includes(request.nextUrl.pathname)) {
    return Response.redirect(new URL("/home", request.url));
  }

  //Redirect to login when no user and im in private route
  if (!currentUser && PRIVATE_ROUTES.includes(request.nextUrl.pathname)) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};
