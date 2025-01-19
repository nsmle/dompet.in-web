import { HttpStatusCode } from "axios";
import { NextRequest } from "next/server";
import { z, ZodSchema } from "zod";

export interface BaseHttpResponse {
	ok: boolean;
	code: string;
	message: string;
}

export const getBody = async <ReturnType>(request: NextRequest, schema: ZodSchema): Promise<ReturnType> => {
	const body = await request.json().catch((): {} => ({}));
	return schema.parse(body);
};

export const HttpCode = HttpStatusCode;
export enum HttpAppCode {
	ValidationError = "0e011e130c98",
	SigninSuccess = "e9c0e1062aed",
	Registered = "d9d0e0062aed",
	UsernameOrEmailAlreadyExists = "400a5b020a5b",
	UnknownError = "9482654d3219",
	MethodNotAllowed = "f171083a1e29",
	// e04224883212
	// 093ee269465a
	// 02b5aebc5e45
	// bbe52c2fbec1
	// 853d8dec3a55
	// 4dbebb26065c
	// aa2d27dccdb4
	// 44c56cb77dbe
	// 92cb9ec9958f
	// 99d6a47b3be9
	// 2a91035a91ef
	// 4c99a212c91e
	// cecd51527232
	// 8506847339b2
	// 1a9f72cc5a2e
}

export const parseToHttpError = <ReturnType = any>(error: unknown, validationErrorMessage: string): { body: ReturnType; init: ResponseInit } => {
	if (error instanceof z.ZodError)
		return {
			body: { ok: false, code: HttpAppCode.ValidationError, message: validationErrorMessage, errors: error.errors } as ReturnType,
			init: { status: HttpCode.BadRequest } as ResponseInit,
		};

	return {
		body: { ok: false, code: HttpAppCode.UnknownError, message: "Terjadi masalah, silahkan refresh browser!" } as ReturnType,
		init: { status: HttpCode.InternalServerError },
	};
};
