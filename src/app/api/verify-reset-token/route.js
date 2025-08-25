import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token mancante" }, { status: 400 });
  }

  try {
    const SECRET_KEY = process.env.JWT_SECRET;
    const encoder = new TextEncoder();
    const secret = encoder.encode(SECRET_KEY);

    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json(
      { message: "Token valido", email: payload.email, userId: payload.userId },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Token non valido o scaduto" },
      { status: 401 }
    );
  }
}
