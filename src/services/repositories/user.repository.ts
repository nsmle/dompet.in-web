import Sequelize, { InferCreationAttributes } from "@sequelize/core";
import { UserEntity } from "@service/entities/user.entity";
import { Repository } from "@service/repositories/core/repository";

export class UserRepository {
	private db: Sequelize;
	private repo: Repository;
	private model: typeof UserEntity;

	constructor(repository: Repository, database: Sequelize, model: typeof UserEntity) {
		this.repo = repository;
		this.db = database;
		this.model = model;
	}

	async getUsers(): Promise<UserEntity[]> {
		return await this.model.findAll();
	}

	async addUser(user: Partial<Omit<InferCreationAttributes<UserEntity>, "id" | "createdAt" | "updatedAt" | "deletedAt">>): Promise<UserEntity> {
		const userData: InferCreationAttributes<UserEntity> = user as InferCreationAttributes<UserEntity>;
		if (userData?.roleId) userData.roleId = await this.repo.role().getDefaultRoleId();

		return await this.model.create(userData);
	}
}
