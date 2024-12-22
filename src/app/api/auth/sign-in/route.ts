import { NextResponse, type NextRequest } from "next/server";
import { Repository } from "@service/repositories/core/repository";

export async function GET(request: NextRequest): Promise<NextResponse> {
	const repo = new Repository();

	const requestHeaders = new Headers(request.headers);
	return NextResponse.json({ message: "Login Service" });
}
