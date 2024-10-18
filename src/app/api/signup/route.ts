import { NextResponse, type NextRequest } from "next/server";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const body = await request.json();

    const response = await fetch(`${process.env.API_URL}/auth/signup`, {
      body: JSON.stringify(body),
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
    });
    const responseData = (await response.json()) as {
      accessToken: "string";
      refreshToken: "string";
    };

    if (responseData && responseData.accessToken) {
      const response = NextResponse.json({
        message: "Registered in successfully.",
        success: true,
      });

      return response;
    }

    return NextResponse.json({ error: "Cannot register." }, { status: 401 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
};
