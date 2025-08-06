import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("A variável NEXT_PUBLIC_JWT_SECRET não está definida.");
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const token = req.cookies.get("session")?.value;

  if (!token) {
    return redirectToHome(url);
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
    return NextResponse.next();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("JWT inválido:", error);
    }
    return redirectToHome(url);
  }
}

function redirectToHome(url: URL) {
  url.pathname = "/";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/canhonto-eletronico/:path*"],
};
