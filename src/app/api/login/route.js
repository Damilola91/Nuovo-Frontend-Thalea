import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      }
    );

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data.message || "Errore nel login" },
        { status: backendRes.status }
      );
    }

    const response = NextResponse.json({
      message: data.message,
      user: data.user,
      token: data.user.userToken,
    });

    response.cookies.set("token", data.user.userToken, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 2,
      path: "/",
      sameSite: "lax",
    });

    return response;
  } catch (err) {
    console.error("Errore login API route:", err);
    return NextResponse.json(
      { message: "Errore del server durante il login" },
      { status: 500 }
    );
  }
}
