import { DatabaseConfig, SupportedDatabaseDialectName } from "@type/database.type";

export class Config {
	private static _AppName: string = process.env.NEXT_PUBLIC_APP_NAME || "";
	static get AppName(): string {
		return this.resolve(this._AppName);
	}

	private static _AppTitle: string = process.env.NEXT_PUBLIC_APP_TITLE || "";
	static get AppTitle(): string {
		return this.resolve(this._AppTitle);
	}

	private static _AppDescription: string = process.env.NEXT_PUBLIC_APP_DESCRIPTION || "";
	static get AppDescription(): string {
		return this.resolve(this._AppDescription);
	}

	private static _AppUrl: string = process.env.NEXT_PUBLIC_APP_URL || "";
	static get AppUrl(): string {
		return this.resolve(this._AppUrl);
	}

	private static _ApiUrl: string = process.env.NEXT_PUBLIC_APP_URL || "";
	static get ApiUrl(): string {
		return this._ApiUrl + "api";
	}

	private static _AppSecret: string = process.env.APP_SECRET || "";
	static get AppSecret(): string {
		return this._AppSecret;
	}

	private static _SessionSecret: string = process.env.SESSION_SECRET || "";
	static get SessionSecret(): string {
		return this._SessionSecret;
	}

	private static _SessionExpire: string | null = process.env.SESSION_EXPIRE || null;
	static get SessionExpire(): string | null {
		return this._SessionExpire;
	}

	private static _SessionRefreshExpire: string | null = process.env.SESSION_REFRESH_EXPIRE || null;
	static get SessionRefreshExpire(): string | null {
		return this._SessionRefreshExpire;
	}

	private static _SessionAlgorithm: string | null = process.env.SESSION_ALGORITHM || null;
	static get SessionAlgorithm(): string | null {
		return this._SessionAlgorithm;
	}

	private static _Database: DatabaseConfig = {
		dialect: String(process.env.DATABASE_DRIVER) as SupportedDatabaseDialectName,
		host: String(process.env.DATABASE_HOST),
		port: Number(process.env.DATABASE_PORT),
		user: String(process.env.DATABASE_USERNAME),
		password: String(process.env.DATABASE_PASSWORD),
		database: String(process.env.DATABASE_NAME),
	};
	static get Database(): DatabaseConfig {
		return this._Database;
	}

	static resolve(text?: string): string {
		if (!text) return "";
		const resolved = text
			.replace(/APP_URL/gm, String(process.env.NEXT_PUBLIC_APP_URL))
			.replace(/APP_NAME/gm, String(process.env.NEXT_PUBLIC_APP_NAME))
			.replace(/APP_TITLE/gm, String(process.env.NEXT_PUBLIC_APP_TITLE))
			.replace(/APP_DESCRIPTION/gm, String(process.env.NEXT_PUBLIC_APP_DESCRIPTION))
			.trim();
		return resolved;
	}
}
