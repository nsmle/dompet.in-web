import Sequelize from "@sequelize/core";

// global.d.ts
export {};

declare global {
	// Tambahkan properti global sesuai kebutuhan
	var __database: Sequelize | undefined;
}
