import Sequelize, { FindAttributeOptions, InferAttributes, InferCreationAttributes, Op } from "@sequelize/core";
import { UserEntity } from "@service/entities/user.entity";
import { Repository } from "@service/repositories/core/repository";
import { Sign } from "@src/utils/sign.util";

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

	async addUser(
		user: Partial<Omit<InferCreationAttributes<UserEntity>, "id" | "createdAt" | "updatedAt" | "deletedAt">>,
	): Promise<InferAttributes<UserEntity>> {
		const userData: InferCreationAttributes<UserEntity> = user as InferCreationAttributes<UserEntity>;
		if (!userData?.roleId) userData.roleId = await this.repo.role().getDefaultRoleId();
		userData.password = Sign.hash(userData.password);
		return (await this.model.create(userData)).dataValues;
	}

	async getUser(userId: string, columns?: FindAttributeOptions<InferAttributes<UserEntity>>): Promise<UserEntity | null> {
		return await this.model.findOne({ where: { id: userId }, attributes: columns });
	}

	async getUserByUsername(username: string): Promise<UserEntity | null> {
		return await this.model.findOne({ where: { username } });
	}

	async checkUsername(username: string): Promise<boolean> {
		const user = await this.model.findOne({ where: { username } });
		return !!user;
	}

	async isUserExists(username: string, email: string): Promise<boolean> {
		const user = await this.model.findOne({ where: { [Op.or]: [{ username }, { email }] } });
		return !!user;
	}

	async isPasswordMatch(user: UserEntity | null, password: string): Promise<boolean> {
		return await Sign.compare(password, user?.password ?? "");
	}
}
