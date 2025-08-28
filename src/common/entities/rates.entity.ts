import {CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model} from "@sequelize/core";
import {CurrencyEntity} from "./currency.entity";
import {
    AllowNull,
    Attribute,
    AutoIncrement,
    BelongsTo,
    Default,
    NotNull,
    PrimaryKey, Table
} from "@sequelize/core/decorators-legacy";

@Table({
    tableName: "rates",
})
export class RatesEntity extends Model<InferAttributes<RatesEntity>, InferCreationAttributes<RatesEntity>> {

    @PrimaryKey()
    @AutoIncrement()
    @Attribute(DataTypes.INTEGER)
    declare id: CreationOptional<number>;

    @BelongsTo(() => CurrencyEntity, 'id')
    declare currencyId: ForeignKey<CurrencyEntity['id']>;

    @Attribute(DataTypes.DECIMAL)
    @NotNull()
    @Default(() => 0)
    declare mid: number;

    @Attribute(DataTypes.DATE)
    declare rateDate: Date;
}
