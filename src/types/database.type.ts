export type SupportedDatabaseDialectName = "mysql" | "postgres" | "mariadb";

export interface DatabaseConfig {
	dialect: SupportedDatabaseDialectName;
	host: string;
	port: number;
	user: string;
	password: string;
	database: string;
}
