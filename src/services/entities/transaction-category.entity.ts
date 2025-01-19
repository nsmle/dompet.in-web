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
import { Attribute, BeforeCreate, BelongsTo, Default, NotNull, PrimaryKey, Table } from "@sequelize/core/decorators-legacy";
import { UserEntity } from "@entity/user.entity";
import type { UUID } from "@src/utils/uuid.util";
import { uuid } from "@src/utils/uuid.util";

enum TransactionCategoryVisibility {
	Private = "Private",
	Public = "Public",
}

@Table({ modelName: "TransactionCategory", tableName: "transaction_categories" })
export class TransactionCategoryEntity extends Model<InferAttributes<TransactionCategoryEntity>, InferCreationAttributes<TransactionCategoryEntity>> {
	@PrimaryKey()
	@NotNull()
	@Attribute({ type: DataTypes.UUID.V4, defaultValue: uuid })
	declare id: UUID;

	@Attribute(DataTypes.STRING(32))
	@NotNull()
	declare name: string;

	@Attribute(DataTypes.TEXT)
	declare description?: string;

	@Attribute(DataTypes.ENUM(Object.values(TransactionCategoryVisibility)))
	@NotNull()
	@Default(TransactionCategoryVisibility.Private)
	declare type: TransactionCategoryVisibility;

	@Attribute(DataTypes.UUID.V4)
	declare creatorId: UUID;

	@BelongsTo((): typeof UserEntity => UserEntity, { foreignKey: "userId", targetKey: "id" })
	declare creator?: Awaited<UserEntity>;

	@Attribute(DataTypes.BOOLEAN)
	declare isSuspend: boolean;

	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
	declare deletedAt: CreationOptional<Date>;

	static override async create<
		M extends Model<InferAttributes<TransactionCategoryEntity>, InferCreationAttributes<TransactionCategoryEntity>> = TransactionCategoryEntity,
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
	static setId(instance: TransactionCategoryEntity): void {
		instance.id = uuid();
	}
}
