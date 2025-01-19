import { ModelStatic } from "@sequelize/core";
import { TransactionCategoryEntity } from "@entity/transaction-category.entity";
import { TransactionItemEntity } from "@entity/transaction-item.entity";
import { TransactionEntity } from "@entity/transaction.entity";
import { WalletEntity } from "@entity/wallet.entity";
import { RoleEntity } from "@service/entities/role.entity";
import { UserEntity } from "@service/entities/user.entity";
import { Database } from "@service/repositories/core/database";
import { RoleRepository } from "@service/repositories/role.repository";
import { UserRepository } from "@service/repositories/user.repository";

export class Repository extends Database {
	public static models: ModelStatic[] = [RoleEntity, UserEntity, WalletEntity, TransactionEntity, TransactionCategoryEntity, TransactionItemEntity];

	public static async init(): Promise<{ state: "connected" | "connecting" }> {
		const db = await super.register();
		return { state: db ? "connected" : "connecting" };
	}

	// User services
	private static _user: UserRepository;
	public static get user(): UserRepository {
		if (!this._user) {
			const repo = new Repository();
			const model: typeof UserEntity = repo.database.models.get<UserEntity>(UserEntity.name) as typeof UserEntity;
			this._user = new UserRepository(repo, repo.database, model);
		}
		return this._user;
	}

	public get user(): UserRepository {
		const model: typeof UserEntity = this.database.models.get<UserEntity>(UserEntity.name) as typeof UserEntity;
		return new UserRepository(this, this.database, model);
	}

	// Role services

	public static role(): RoleRepository {
		const repo = new Repository();
		const model: typeof RoleEntity = repo.database.models.get<RoleEntity>(RoleEntity.name) as typeof RoleEntity;
		return new RoleRepository(repo, repo.database, model);
	}
	public role(): RoleRepository {
		const model: typeof RoleEntity = this.database.models.get<RoleEntity>(RoleEntity.name) as typeof RoleEntity;
		return new RoleRepository(this, this.database, model);
	}

	// Transaction services
	// Transaction Category Services
}
