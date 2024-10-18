import { NextResponse } from "next/server";

export const GET = async (): Promise<NextResponse> => {
  try {
    const response = NextResponse.json({ success: true });

    response.cookies.set("token", "", { expires: new Date(0), httpOnly: true });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
};
