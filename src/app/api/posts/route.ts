import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const body = await request.json();
    const cookiesStore = cookies();
    const token = cookiesStore.get("token")?.value || "";
    const tokenData = jwt.verify(token, process.env.JWT_SECRET) as TUser;
    const { content, title } = body;

    const response = await fetch(`${process.env.API_URL}/posts`, {
      body: JSON.stringify({ content, title }),
      headers: {
        Authorization: `Bearer ${tokenData.accessToken}`,
        "content-type": "application/json",
      },
      method: "POST",
    });
    const responseData = (await response.json()) as TPost;

    if (response.ok && responseData) {
      return NextResponse.json({
        message: "Post created successfully.",
        success: true,
      });
    }

    return NextResponse.json({ error: "Cannot create post." }, { status: 401 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
};
