import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const body = await request.json();

    const userResponse = await fetch(`${process.env.API_URL}/auth/login`, {
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });
    const userData = (await userResponse.json()) as TUser;

    if (userData && userData.user) {
      const token = jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const response = NextResponse.json({
        message: "Logged in successfully",
        success: true,
      });

      response.cookies.set("token", token, { httpOnly: true });

      return response;
    }

    return NextResponse.json(
      { error: "Please check your credentials again." },
      { status: 401 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
};
