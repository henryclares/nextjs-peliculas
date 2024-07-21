import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { imprimir } from "./util/Imprimir";

export const middleware = (req: NextRequest) => {
  const token = req.cookies.get("token");
  imprimir(`token middleware 🔐️: ${token?.value}`, req.nextUrl.pathname);

  try {
    if (req.nextUrl.pathname == "/sign-in") {
      if (token?.value) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
      } else {
        return NextResponse.next();
      }
    }

    return NextResponse.next();
  } catch (e) {
    imprimir(`Error verificando token en middleware`, e);
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }
};

// Supports both a single string value or an array of matchers.
export const config = {
  matcher: ["/", "/sign-in"],
};
