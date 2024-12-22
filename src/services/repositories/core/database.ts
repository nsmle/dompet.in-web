import Sequelize, { ModelStatic } from "@sequelize/core";
import { Repository } from "@repository/core/repository";
import { DatabaseConfig, SupportedDatabaseDialectName } from "@type/database.type";

export class Database {
	private models: ModelStatic[] = Repository.models;
	protected database: Sequelize;
	private config: DatabaseConfig = {
		dialect: String(process.env.DATABASE_DRIVER) as SupportedDatabaseDialectName,
		host: String(process.env.DATABASE_HOST),
		port: Number(process.env.DATABASE_PORT),
		user: String(process.env.DATABASE_USERNAME),
		password: String(process.env.DATABASE_PASSWORD),
		database: String(process.env.DATABASE_NAME),
	};

	constructor() {
		console.log({ isDatabaseExist: global.__database instanceof Sequelize });
		global.__database = global.__database instanceof Sequelize ? global.__database : this.init();
		this.database = global.__database;
	}

	protected init(): Sequelize {
		const sequelize = new Sequelize({
			...this.config,
			dialect: "mysql",
			timezone: "+07:00",
			models: this.models,
			define: { underscored: true, paranoid: true, charset: "utf8", engine: "InnoDB" },
		});

		// sequelize.sync({ force: true });
		sequelize.sync();
		return sequelize;
	}

	public static register(): void {
		new Database();
	}
}
