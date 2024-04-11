import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/login", "/signup"];
const PRIVATE_ROUTES = ["/", "/transactions", "/add-report", "/home"];

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
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
