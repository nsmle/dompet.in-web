"use server";

import { InferAttributes } from "@sequelize/core";
import { cookies } from "next/headers";
import { cache } from "react";
import { UserEntity } from "@entity/user.entity";
import { Repository } from "@repository/core/repository";
import { Jwt, JWTPayloadUserParsed } from "@src/utils/jwt.util";

export type SessionType = { isAuthenticate: boolean; user: Omit<InferAttributes<UserEntity>, "roleId" | "password"> | null };

export const getSessionUserId = cache(async (): Promise<string | null> => {
	const cookie = (await cookies()).get("access")?.value || "";
	const session = await Jwt.unsign<JWTPayloadUserParsed>(cookie, true);
	return session?.userId || null;
});

export const getSession = cache(async (): Promise<SessionType> => {
	const userId = await getSessionUserId();
	if (!userId) return { isAuthenticate: false, user: null };

	try {
		const userValues = (await Repository.user.getUser(userId))?.dataValues || null;
		if (!userValues) return { isAuthenticate: false, user: null };
		const { roleId, password, ...user } = userValues;
		return { isAuthenticate: true, user };
	} catch (error) {
		return { isAuthenticate: false, user: null };
	}
});
