import Sequelize, { ModelStatic } from "@sequelize/core";
import { Repository } from "@repository/core/repository";
import { Config } from "@src/utils/config.util";

let DATABASE: Sequelize | null = null;

export class Database {
	private models: ModelStatic[] = Repository.models;
	protected database: Sequelize;

	constructor() {
		// console.log({ isDatabaseExist: DATABASE instanceof Sequelize });
		DATABASE = DATABASE instanceof Sequelize ? DATABASE : this.init();
		this.database = DATABASE;
	}

	protected init(): Sequelize {
		const sequelize =
			DATABASE ??
			new Sequelize({
				...Config.Database,
				timezone: "+07:00",
				models: this.models,
				define: {
					underscored: true,
					paranoid: true,
					charset: "utf8",
					engine: "InnoDB",
				},
			});

		// sequelize.sync({ force: true });
		sequelize.sync();
		return sequelize;
	}

	public static async register(): Promise<typeof DATABASE> {
		if (!DATABASE) new Database();
		return DATABASE;
	}
}
