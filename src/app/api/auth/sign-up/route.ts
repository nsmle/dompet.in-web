import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { SignUpApiSchema, SignUpReqData } from "@lib/definitions/signup.definition";
import { Repository } from "@repository/core/repository";
import { BaseHttpResponse, getBody, HttpAppCode, HttpCode, parseToHttpError } from "@src/utils/http.util";

export interface SignUp extends BaseHttpResponse {
	data?: { userId: string };
	errors?: z.ZodIssue[];
	isCreated?: boolean;
}

export async function POST(request: NextRequest): Promise<NextResponse<SignUp>> {
	try {
		const data = await getBody<SignUpReqData>(request, SignUpApiSchema);
		const repo = new Repository().user;
		const exists = await repo.isUserExists(data.username, data.email);
		if (exists)
			return NextResponse.json(
				{ ok: false, code: HttpAppCode.UsernameOrEmailAlreadyExists, message: "Username atau email sudah ada!" },
				{ status: HttpCode.Conflict },
			);

		const user = await repo.addUser(data);
		return NextResponse.json({
			ok: true,
			code: HttpAppCode.Registered,
			message: "Berhasil registrasi, silahkan login!",
			data: { userId: user.id },
		});
	} catch (error) {
		const { body, init } = parseToHttpError<SignUp>(error, "Gagal register!");
		return NextResponse.json<SignUp>(body, init);
	}
}
