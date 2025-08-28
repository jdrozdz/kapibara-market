import {
    CreationOptional,
    DataTypes,
    ForeignKey,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize
} from "sequelize";
import {CurrencyEntity} from "./currency.entity";

export class RatesEntity extends Model<InferAttributes<RatesEntity>, InferCreationAttributes<RatesEntity>> {
    declare id: CreationOptional<number>;
    declare currencyId: ForeignKey<CurrencyEntity['id']>;
    declare mid: number;
    declare rateDate: string;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export function RatesInit(sequelize: Sequelize) {
    RatesEntity.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id'
        },
        mid: {
            type: DataTypes.REAL,
            defaultValue: 0,
            field: 'mid'
        },
        rateDate: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'rateDate'
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'createdAt'
        },
        updatedAt: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'updatedAt'
        }
    }, { sequelize, modelName: 'RatesEntity', tableName: 'rates' });
}
