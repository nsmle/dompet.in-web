"use server-only";

import * as crypto from "crypto";
import { Config } from "@src/utils/config.util";

export class Sign {
	private static HashAlgorithm: string = "sha512";
	private static HashIterations: number = 200000;
	private static HashKeyLength: number = 64;
	private static HashEncoding: BufferEncoding = "hex";

	static hash(data: string): string {
		return crypto.pbkdf2Sync(data, Config.AppSecret, this.HashIterations, this.HashKeyLength, this.HashAlgorithm).toString(this.HashEncoding);
	}

	static compare(data: string, hash: string): boolean {
		return this.hash(data) === hash;
	}
}
