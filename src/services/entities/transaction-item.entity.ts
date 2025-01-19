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
import { TransactionEntity } from "@entity/transaction.entity";
import type { UUID } from "@src/utils/uuid.util";
import { uuid } from "@src/utils/uuid.util";

enum TransactionType {
	Income = "INCOME",
	Expense = "EXPENSE",
}

@Table({ modelName: "TransactionItem", tableName: "transaction_items" })
export class TransactionItemEntity extends Model<InferAttributes<TransactionItemEntity>, InferCreationAttributes<TransactionItemEntity>> {
	@PrimaryKey()
	@NotNull()
	@Attribute({ type: DataTypes.UUID.V4, defaultValue: uuid })
	declare id: UUID;

	@Attribute(DataTypes.UUID.V4)
	declare transactionId: UUID;

	@Attribute(DataTypes.STRING(64))
	@NotNull()
	declare product: string;

	@Attribute(DataTypes.DECIMAL(15, 2))
	@NotNull()
	declare price: number;

	@Attribute(DataTypes.INTEGER)
	@NotNull()
	declare qty: number;

	@BelongsTo((): typeof TransactionEntity => TransactionEntity, { foreignKey: "categoryId", targetKey: "id" })
	declare transaction?: Awaited<TransactionEntity>;

	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
	declare deletedAt: CreationOptional<Date>;

	static override async create<
		M extends Model<InferAttributes<TransactionItemEntity>, InferCreationAttributes<TransactionItemEntity>> = TransactionItemEntity,
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
	static setId(instance: TransactionItemEntity): void {
		instance.id = uuid();
	}
}
