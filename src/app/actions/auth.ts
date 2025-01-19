"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { route } from "@lib/uri";

export async function deleteSession(): Promise<void> {
	const cookieStore = await cookies();
	cookieStore.delete("access");
	cookieStore.delete("refresh");
}

export async function logout(): Promise<void> {
	await deleteSession();
	redirect(route.signIn);
}
