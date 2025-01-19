import * as jose from "jose";
import { DateTime } from "luxon";
import { Config } from "@src/utils/config.util";

export enum TokenType {
	Access = "access",
	Refresh = "refresh",
}

export type TokenJWT = string;
export type JWTPayload = { name: string; role: string; type: string; iat: number; iss: string; aud: string; sub: string; exp: number };
export type JWTPayloadUserParsed = {
	userId: string;
	username: string;
	name: string;
	roleId: string;
	type: string;
	iat: number;
	iss: string;
	sub: string;
	exp: number;
};

export class Jwt {
	private static JWTAlgorithm = Config.SessionAlgorithm || "HS256";
	private static JWTAccessExpire = Config.SessionExpire || "30d";
	private static JWTRefreshExpire = Config.SessionRefreshExpire || "1y";

	public static get accessExpire(): DateTime<true> {
		const unit = Jwt.JWTRefreshExpire.endsWith("d") ? "days" : Jwt.JWTRefreshExpire.endsWith("m") ? "months" : "years";
		return DateTime.now().plus({ [unit]: parseInt(Jwt.JWTAccessExpire) });
	}

	public static get refreshExpire(): DateTime<true> {
		const unit = Jwt.JWTRefreshExpire.endsWith("d") ? "days" : Jwt.JWTRefreshExpire.endsWith("m") ? "months" : "years";
		return DateTime.now().plus({ [unit]: parseInt(Jwt.JWTRefreshExpire) });
	}

	static async sign(userId: string, username: string, userName: string, roleId: string, type: TokenType): Promise<TokenJWT> {
		const secret = new TextEncoder().encode(Config.SessionSecret);
		const jwt = await new jose.SignJWT({ user: username, name: userName, role: roleId, type: type.toString() })
			.setProtectedHeader({ alg: this.JWTAlgorithm, typ: "JWT" })
			.setIssuedAt()
			.setIssuer(Config.AppUrl)
			.setAudience(Config.AppName)
			.setSubject(userId)
			.setExpirationTime(type == TokenType.Access ? this.JWTAccessExpire : this.JWTRefreshExpire)
			.sign(secret);
		return jwt;
	}

	static async unsign<RT = JWTPayload | JWTPayloadUserParsed>(token: TokenJWT, parseToUser: boolean = false): Promise<RT | null> {
		try {
			const secret = new TextEncoder().encode(Config.SessionSecret);
			const { payload } = await jose.jwtVerify<JWTPayload>(token, secret, {
				algorithms: [this.JWTAlgorithm],
			});

			if (parseToUser) {
				const { user, name, role, type, iat, iss, sub, exp, aud } = payload;
				return { userId: sub, username: user, name, roleId: role, type, aud, iss, sub, iat, exp } as RT;
			}

			return payload as RT;
		} catch (error) {
			return null;
		}
	}

	static async isRefreshExpired(token: TokenJWT): Promise<boolean> {
		const payload = await this.unsign(token);
		if (!payload) return true;

		const { exp } = payload;
		return DateTime.now() > DateTime.fromSeconds(exp);
	}
}
