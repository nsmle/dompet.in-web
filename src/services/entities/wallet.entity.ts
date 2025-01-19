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
import { UserEntity } from "@entity/user.entity";
import type { UUID } from "@src/utils/uuid.util";
import { uuid } from "@src/utils/uuid.util";

export enum WalletType {
	Bank = "BANK",
	Cash = "CONVENTIONAL",
	EWallet = "EWALLET",
	CreditCard = "CREDIT_CARD",
}

export enum WalletProvider {
	// Bank
	BCA = "B014",
	BNI = "B009",
	BRI = "B002",
	BJB = "B110",
	BTN = "B200",
	BSI = "B451",
	MEGA = "B426",
	MANDIRI = "B008",
	CIMB = "B022",
	// E-Wallet
	GOPAY = "EGopay",
	DANA = "EDana",
	SHOPEEPAY = "EShopeePay",
	OVO = "EOvo",
	LINKAJA = "ELinkAja",
	// Credit Card
	Cash = "CONVENTIONAL",
}

@Table({ modelName: "Wallet", tableName: "wallets" })
export class WalletEntity extends Model<InferAttributes<WalletEntity>, InferCreationAttributes<WalletEntity>> {
	@PrimaryKey()
	@NotNull()
	@Attribute({ type: DataTypes.UUID.V4, defaultValue: uuid })
	declare id: UUID;

	@Attribute(DataTypes.ENUM(Object.values(WalletType)))
	@NotNull()
	declare type: WalletType;

	@Attribute(DataTypes.STRING(64))
	@NotNull()
	declare accountNumber: string;

	@Attribute(DataTypes.STRING(64))
	@NotNull()
	declare accountName: string;

	@Attribute(DataTypes.STRING(64))
	@NotNull()
	declare accountStatus: string;

	@Attribute(DataTypes.ENUM(Object.values(WalletProvider)))
	@NotNull()
	declare accountProvider: WalletProvider;

	@Attribute(DataTypes.TEXT)
	declare description: string;

	@Attribute(DataTypes.UUID.V4)
	declare userId: UUID;

	@BelongsTo((): typeof UserEntity => UserEntity, { foreignKey: "userId", targetKey: "id" })
	declare user?: Awaited<UserEntity>;

	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;
	declare deletedAt: CreationOptional<Date>;

	static override async create<
		M extends Model<InferAttributes<WalletEntity>, InferCreationAttributes<WalletEntity>> = WalletEntity,
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
	static setId(instance: WalletEntity): void {
		instance.id = uuid();
	}
}
