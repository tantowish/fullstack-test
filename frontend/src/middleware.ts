import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const token = req.cookies.get('token');

    const authPath = ["/signin", "/signup"];

    if (token && authPath.includes(path)) {
        return NextResponse.redirect(new URL("/", req.url));
    } else if (!token && path !== "/signin" && path !== "/signup") {
        return NextResponse.redirect(new URL("/signin", req.url));
    }
    
    return NextResponse.next();
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
    "/((?!api|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
