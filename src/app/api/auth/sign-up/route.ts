import { NextResponse } from "next/server";
import { HttpRequest, HttpResponse } from "@service/http/http.service";

export async function GET(request: HttpRequest): Promise<HttpResponse> {
	const repo = request.repo;
	console.log(repo?.user);

	const requestHeaders = new Headers(request.headers);
	return NextResponse.json({ message: "Register Service" });
}
