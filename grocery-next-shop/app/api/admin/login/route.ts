import { NextResponse } from "next/server";
import { signAdminToken, validateAdminCredentials, authCookieName } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!validateAdminCredentials(username, password)) {
      return NextResponse.json({ error: "Sai tên đăng nhập hoặc mật khẩu" }, { status: 401 });
    }

    const token = signAdminToken({ username });
    const response = NextResponse.json({ success: true });

    response.cookies.set(authCookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Đăng nhập thất bại" }, { status: 500 });
  }
}
