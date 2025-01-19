import { InferAttributes } from "@sequelize/core";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { UserEntity } from "@entity/user.entity";
import { SignInApiParse, SignInApiSchema, SignInReqData } from "@lib/definitions/signin.definition";
import { Repository } from "@service/repositories/core/repository";
import { BaseHttpResponse, getBody, HttpAppCode, parseToHttpError } from "@src/utils/http.util";
import { Jwt, TokenType } from "@src/utils/jwt.util";

export interface SignIn extends BaseHttpResponse {
	data?: { user: Omit<InferAttributes<UserEntity>, "password"> };
	errors?: z.ZodIssue[];
	isCreated?: boolean;
}

export async function POST(request: NextRequest): Promise<NextResponse<SignIn>> {
	try {
		const { username, password } = await getBody<SignInReqData>(request, SignInApiSchema);
		const repo = new Repository().user;
		const user = (await repo.getUserByUsername(username)) as UserEntity;

		await SignInApiParse.username.parseAsync({ username: user?.username });
		await SignInApiParse.password.parseAsync({ password: await repo.isPasswordMatch(user, password) });

		const cookieStore = await cookies();
		const cookieData: Partial<ResponseCookie> = { httpOnly: true, secure: true, sameSite: "lax", path: "/" };

		cookieStore.set("access", await Jwt.sign(user.id, user.username, user.name, user.roleId, TokenType.Access), {
			...cookieData,
			expires: Jwt.accessExpire.toMillis(),
		});
		cookieStore.set("refresh", await Jwt.sign(user.id, user.username, user.name, user.roleId, TokenType.Refresh), {
			...cookieData,
			expires: Jwt.refreshExpire.toMillis(),
		});

		const { password: pw, ...redataUser } = user?.dataValues;
		return NextResponse.json({
			ok: true,
			code: HttpAppCode.SigninSuccess,
			message: `Hallo ${user.name}, apa kabar?`,
			data: { user: redataUser },
		});
	} catch (error) {
		const { body, init } = parseToHttpError<SignIn>(error, "Login gagal");
		return NextResponse.json<SignIn>(body, init);
	}
}
