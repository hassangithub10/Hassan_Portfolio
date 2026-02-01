import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "super-secret-key-change-this";
const key = new TextEncoder().encode(SECRET_KEY);

export async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const cookie = req.cookies.get("admin_session")?.value;

    // 1. If trying to access Login page (/letmein)
    if (path === "/letmein") {
        if (cookie) {
            try {
                await jwtVerify(cookie, key);
                // Already logged in, go to dashboard
                return NextResponse.redirect(new URL("/letmein/dashboard", req.url));
            } catch (err) {
                // Invalid token, stay on login
                return NextResponse.next();
            }
        }
        return NextResponse.next();
    }

    // 2. Protect all other /letmein/* routes (Admin Area)
    if (path.startsWith("/letmein/")) {
        if (!cookie) {
            return NextResponse.redirect(new URL("/letmein", req.url));
        }
        try {
            await jwtVerify(cookie, key);
            return NextResponse.next();
        } catch (err) {
            return NextResponse.redirect(new URL("/letmein", req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/letmein/:path*", "/letmein"],
};
