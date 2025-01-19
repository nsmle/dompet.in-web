"use server-only";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { route } from "@lib/uri";
import { Jwt, JWTPayloadUserParsed, TokenType } from "@src/utils/jwt.util";

const protectedRoutes = [
	route.dashboard,
	route.product,
	route.integration,
	route.workspace,
	route.setting,
	route.profile,
	route.transaction,
	route.transaction_category,
];
const publicRoutes = [route.landing, route.signIn, route.signUp, route.auth];
const redirToDashboardRoutes = [route.landing, route.signIn, route.signUp, route.auth];

export default async function middleware(req: NextRequest): Promise<NextResponse<any>> {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);

	const cookieAccess = (await cookies()).get("access")?.value || "";
	const session = await Jwt.unsign<JWTPayloadUserParsed>(cookieAccess, true);

	if (isProtectedRoute && !session?.userId) {
		const cookieRefresh = (await cookies()).get("refresh")?.value || "";

		const session = await Jwt.unsign<JWTPayloadUserParsed>(cookieRefresh, true);
		if (!session?.userId) return NextResponse.redirect(new URL(route.signIn, req.nextUrl));

		(await cookies()).set("access", await Jwt.sign(session.userId, session.username, session.name, session.roleId, TokenType.Access), {
			httpOnly: true,
			secure: true,
			sameSite: "lax",
			path: "/",
			expires: Jwt.accessExpire.toMillis(),
		});
	}

	const isRedirToDashboardRoute = redirToDashboardRoutes.includes(path);
	if (isRedirToDashboardRoute && session?.userId) {
		return NextResponse.redirect(new URL(route.dashboard, req.nextUrl));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|/motion|_next/image|.*\\.png$|.*\\.svg$).*)"],
};
