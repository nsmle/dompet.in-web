import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
	const requestHeaders = new Headers(request.headers);
	return NextResponse.json({ message: "Forgot password service" });
}
