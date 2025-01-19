import { NextRequest, NextResponse } from "next/server";
import { Repository } from "@repository/core/repository";

type Data = {
	state: "connecting" | "connected";
};

export async function POST(request: NextRequest): Promise<NextResponse<Data>> {
	const db = await Repository.init();
	return NextResponse.json({ state: db.state });
}
