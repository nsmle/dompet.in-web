import Sequelize, { InferCreationAttributes } from "@sequelize/core";
import { RoleEntity } from "@service/entities/role.entity";
import { Repository } from "@service/repositories/core/repository";

export class RoleRepository {
	private db: Sequelize;
	private repo: Repository;
	private model: typeof RoleEntity;

	constructor(repository: Repository, database: Sequelize, model: typeof RoleEntity) {
		this.repo = repository;
		this.db = database;
		this.model = model;
	}

	async addRole(role: Omit<InferCreationAttributes<RoleEntity>, "id" | "createdAt" | "updatedAt" | "deletedAt" | "creator" | "users">): Promise<RoleEntity> {
		return await this.model.create(role);
	}

	async getDefaultRoleId(): Promise<string> {
		return (await this.model.findOne({ where: { name: ["user", "User"] } }))?.id || "";
	}
}
