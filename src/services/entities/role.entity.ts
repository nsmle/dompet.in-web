import {
	Attributes,
	CreateOptions,
	CreationAttributes,
	CreationOptional,
	DataTypes,
	InferAttributes,
	InferCreationAttributes,
	Model,
	ModelStatic,
} from "@sequelize/core";
import { Attribute, BelongsTo, HasMany, NotNull, PrimaryKey, Table, Unique } from "@sequelize/core/decorators-legacy";
import { UserEntity } from "@service/entities/user.entity";
import type { UUID } from "@src/utils/uuid.util";
import { uuid } from "@src/utils/uuid.util";

export enum Permission {
	ReadTransaction = "RTRX",
	CreateTransaction = "CTRX",
	UpdateTransaction = "UTRX",
	DeleteTransaction = "DTRX",
	ApproveTransaction = "APTRX",
	RejectTransaction = "RJTRX",
	AssignTransactionCategory = "ATCTX",

	ReadCategoryTransaction = "RCTRX",
	CreateCategoryTransaction = "CCTRX",
	UpdateCategoryTransaction = "UCTRX",
	DeleteCategoryTransaction = "DCTRX",

	UpdateUser = "OPUUSR",
	SuspendUser = "OPSUSR",
	DeleteUser = "OPDUSR",

	CreateRole = "CRRLE",
	UpdateRole = "UPRLE",
	DeleteRole = "DTRLE",

	CreatePermission = "CPRMS",
	UpdatePermission = "UPRMS",
	DeletePermission = "DPRMS",
}

@Table({ modelName: "Role", tableName: "roles" })
export class RoleEntity extends Model<InferAttributes<RoleEntity>, InferCreationAttributes<RoleEntity>> {
	@PrimaryKey()
	@NotNull()
	@Attribute({ type: DataTypes.UUID.V4, defaultValue: uuid })
	declare id: UUID;

	@Attribute(DataTypes.STRING(32))
	@Unique()
	@NotNull()
	declare name: string;

	@Attribute(DataTypes.STRING(64))
	declare description: string;

	@Attribute(DataTypes.JSON)
	@NotNull()
	declare permission: Permission[];

	@Attribute(DataTypes.UUID.V4)
	declare creatorId?: UUID;

	@HasMany((): typeof UserEntity => UserEntity, { foreignKey: "roleId", sourceKey: "id" })
	declare users: UserEntity[];

	@BelongsTo((): typeof UserEntity => UserEntity, { foreignKey: "creatorId", targetKey: "id" })
	declare creator?: Awaited<UserEntity>;

	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
	declare deletedAt: CreationOptional<Date>;

	static override async create<
		M extends Model<InferAttributes<RoleEntity>, InferCreationAttributes<RoleEntity>> = RoleEntity,
		O extends CreateOptions<Omit<Attributes<M>, "id" | "creator" | "users">> = CreateOptions<Omit<Attributes<M>, "id" | "creator" | "users">>,
	>(
		this: ModelStatic<M>,
		record?: Omit<CreationAttributes<M>, "id" | "creator" | "users">,
		options?: O,
	): Promise<O extends { returning: false } | { ignoreDuplicates: true } ? void : M> {
		const reRecord: Attributes<M> = record as Attributes<M>;
		reRecord.id = uuid();
		reRecord.name = reRecord.name.toLowerCase().trim().replace(/\s+/g, "-");
		return super.create<M, O>(reRecord, options);
	}
}
