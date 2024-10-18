import { NextResponse, NextRequest } from "next/server";

export const middleware = (request: NextRequest): NextResponse | undefined => {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/signin" || path === "/signup";
  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token.length > 0) {
    return NextResponse.redirect(new URL("/posts", request.nextUrl));
  }

  if (!isPublicPath && !token.length) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
