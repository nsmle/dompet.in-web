import { ModelStatic } from "@sequelize/core";
import { RoleEntity } from "@service/entities/role.entity";
import { UserEntity } from "@service/entities/user.entity";
import { Database } from "@service/repositories/core/database";
import { RoleRepository } from "@service/repositories/role.repository";
import { UserRepository } from "@service/repositories/user.repository";

export class Repository extends Database {
	public static models: ModelStatic[] = [RoleEntity, UserEntity];

	// User services

	public static user(): UserRepository {
		const repo = new Repository();
		const model: typeof UserEntity = repo.database.models.get<UserEntity>(UserEntity.name) as typeof UserEntity;
		return new UserRepository(repo, repo.database, model);
	}
	public user(): UserRepository {
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
}
