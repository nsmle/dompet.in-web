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
import { Attribute, BeforeCreate, BelongsTo, NotNull, PrimaryKey, Table, Unique } from "@sequelize/core/decorators-legacy";
import { RoleEntity } from "@service/entities/role.entity";
import type { UUID } from "@src/utils/uuid.util";
import { uuid } from "@src/utils/uuid.util";

@Table({ modelName: "User", tableName: "users" })
export class UserEntity extends Model<InferAttributes<UserEntity>, InferCreationAttributes<UserEntity>> {
	@PrimaryKey()
	@NotNull()
	@Attribute({ type: DataTypes.UUID.V4, defaultValue: uuid })
	declare id: UUID;

	@Attribute(DataTypes.STRING(64))
	@NotNull()
	declare name: string;

	@Attribute(DataTypes.STRING(32))
	@Unique()
	@NotNull()
	declare username: string;

	@Attribute(DataTypes.STRING(64))
	@Unique()
	@NotNull()
	declare email: string;

	@Attribute(DataTypes.DATE)
	declare emailVerifiedAt?: Date;

	@Attribute(DataTypes.INTEGER)
	@Unique()
	declare phone?: number;

	@Attribute(DataTypes.INTEGER)
	declare phoneCountyCode?: number;

	@Attribute(DataTypes.TEXT)
	declare photo?: string;

	@Attribute(DataTypes.TEXT)
	declare password: string;

	@Attribute(DataTypes.UUID.V4)
	declare roleId: UUID;

	@BelongsTo((): typeof RoleEntity => RoleEntity, { foreignKey: "roleId", targetKey: "id" })
	declare role?: Awaited<RoleEntity>;

	@Attribute(DataTypes.BOOLEAN)
	declare isSuspend: boolean;

	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
	declare deletedAt: CreationOptional<Date>;

	// static override async create<O extends CreateOptions<Attributes<UserEntity>> = CreateOptions<Attributes<UserEntity>>>(
	// 	record?: CreationAttributes<UserEntity>,
	// 	options?: O,
	// ): Promise<O extends { returning: false } | { ignoreDuplicates: true } ? void : UserEntity> {
	// 	const reRecord: CreationAttributes<UserEntity> = record as CreationAttributes<UserEntity>;
	// 	reRecord.id = uuid();
	// 	return super.create<UserEntity, O>(reRecord, options);
	// }

	static override async create<
		M extends Model<InferAttributes<UserEntity>, InferCreationAttributes<UserEntity>> = UserEntity,
		O extends CreateOptions<Omit<Attributes<M>, "id">> = CreateOptions<Omit<Attributes<M>, "id">>,
	>(
		this: ModelStatic<M>,
		record?: Omit<CreationAttributes<M>, "id">,
		options?: O,
	): Promise<O extends { returning: false } | { ignoreDuplicates: true } ? void : M> {
		const reRecord: Attributes<M> = record as Attributes<M>;
		reRecord.id = uuid();
		return super.create<M, O>(reRecord, options);
	}

	@BeforeCreate()
	static setId(instance: UserEntity): void {
		instance.id = uuid();
	}
}
