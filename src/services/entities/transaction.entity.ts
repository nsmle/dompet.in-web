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
import { Attribute, BeforeCreate, BelongsTo, NotNull, PrimaryKey, Table } from "@sequelize/core/decorators-legacy";
import { TransactionCategoryEntity } from "@entity/transaction-category.entity";
import { UserEntity } from "@entity/user.entity";
import type { UUID } from "@src/utils/uuid.util";
import { uuid } from "@src/utils/uuid.util";

enum TransactionType {
	Income = "INCOME",
	Expense = "EXPENSE",
}

@Table({ modelName: "Transaction", tableName: "transactions" })
export class TransactionEntity extends Model<InferAttributes<TransactionEntity>, InferCreationAttributes<TransactionEntity>> {
	@PrimaryKey()
	@NotNull()
	@Attribute({ type: DataTypes.UUID.V4, defaultValue: uuid })
	declare id: UUID;

	@Attribute(DataTypes.STRING(32))
	@NotNull()
	declare name?: string;

	@Attribute(DataTypes.TEXT)
	declare description?: string;

	@Attribute(DataTypes.ENUM(...Object.values(TransactionType)))
	@NotNull()
	declare type: TransactionType;

	@Attribute(DataTypes.UUID.V4)
	declare walletId?: UUID;

	@Attribute(DataTypes.UUID.V4)
	declare categoryId?: UUID;

	@Attribute(DataTypes.UUID.V4)
	declare userId: UUID;

	@BelongsTo((): typeof TransactionCategoryEntity => TransactionCategoryEntity, { foreignKey: "categoryId", targetKey: "id" })
	declare category?: Awaited<TransactionCategoryEntity>;

	@BelongsTo((): typeof UserEntity => UserEntity, { foreignKey: "userId", targetKey: "id" })
	declare user?: Awaited<UserEntity>;

	@Attribute(DataTypes.BOOLEAN)
	declare isSuspend: boolean;

	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
	declare deletedAt: CreationOptional<Date>;

	static override async create<
		M extends Model<InferAttributes<TransactionEntity>, InferCreationAttributes<TransactionEntity>> = TransactionEntity,
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
	static setId(instance: TransactionEntity): void {
		instance.id = uuid();
	}
}
