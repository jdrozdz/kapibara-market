import {Attribute, AutoIncrement, Default, NotNull, PrimaryKey, Table} from "@sequelize/core/decorators-legacy";
import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "@sequelize/core";

@Table({
    tableName: "currency",
})
export class CurrencyEntity extends Model<InferAttributes<CurrencyEntity>,  InferCreationAttributes<CurrencyEntity>> {

    @PrimaryKey
    @AutoIncrement
    @Attribute(DataTypes.INTEGER)
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    declare name: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare code: string;

    @Attribute(DataTypes.BOOLEAN)
    @Default(() => false)
    declare isCrypto: boolean;
}
