import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const idToken = req.cookies.get("id_token")?.value; // Retrieve id_token from cookies

  if (!idToken) {
    console.error(
      "Missing id_token. Ensure the user is logged in and id_token is stored."
    );
    return NextResponse.json(
      { error: "Missing id_token. Unable to complete logout." },
      { status: 400 }
    );
  }

  const logoutUrl =
    `http://localhost:8080/realms/master/protocol/openid-connect/logout` +
    `?post_logout_redirect_uri=${encodeURIComponent(
      "http://localhost:3003/login"
    )}` +
    `&id_token_hint=${encodeURIComponent(idToken)}`;

  // Clear tokens by setting cookies with Max-Age=0
  const response = NextResponse.redirect(logoutUrl, 307);

  // response.cookies.set("access_token", "", {
  //   httpOnly: true,
  //   path: "/",
  //   maxAge: 0,
  // });

  // response.cookies.set("refresh_token", "", {
  //   httpOnly: true,
  //   path: "/",
  //   maxAge: 0,
  // });

  // response.cookies.set("id_token", "", {
  //   httpOnly: true,
  //   path: "/",
  //   maxAge: 0,
  // });

  return response;
}
