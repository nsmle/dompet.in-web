import { NextRequest, NextResponse } from "next/server";
import { Repository } from "@repository/core/repository";

export interface CheckUsername {
	username?: string;
	exists: boolean;
	error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<CheckUsername>> {
	const data = await request?.json().catch((): { username: null } => ({ username: null }));
	if (!data.username)
		return NextResponse.json({ exists: false, username: "Username field is required!" }, { status: 400, statusText: "Username is required!" });

	const repo = new Repository();
	const isExists = await repo.user.checkUsername(data.username);

	return NextResponse.json(
		{ username: data.username, exists: isExists },
		{ status: isExists ? 409 : 200, statusText: isExists ? "Username is already taken!" : "Username available" },
	);
}
