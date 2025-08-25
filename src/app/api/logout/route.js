import { NextResponse } from "next/server";

export async function POST() {
  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(
      { message: data.message },
      { status: backendRes.status }
    );
  }

  const response = NextResponse.json({ message: data.message });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });

  return response;
}
