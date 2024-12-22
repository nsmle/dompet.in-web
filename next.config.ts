import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	serverExternalPackages: ["sequelize", "@sequelize/core", "sequelize-typescript"],
	experimental: {
		turbo: {
			resolveAlias: {
				"@sequelize/sqlite3": "@sequelize/mysql",
				"@sequelize/mssql": "@sequelize/mysql",
				"@sequelize/db2": "@sequelize/mysql",
				"@sequelize/db2-ibmi": "@sequelize/mysql",
				"@sequelize/snowflake": "@sequelize/mysql",
			},
			minify: true,
		},
	},
};

export default nextConfig;
