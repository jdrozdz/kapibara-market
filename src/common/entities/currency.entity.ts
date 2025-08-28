import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model, Sequelize} from "sequelize";

export class CurrencyEntity extends Model<InferAttributes<CurrencyEntity>, InferCreationAttributes<CurrencyEntity>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare code: string;
    declare isCrypto: boolean;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

export function CurrencyEntityInit(sequelize: Sequelize) {
    CurrencyEntity.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            field: 'id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'name'
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'code',
            validate: {
                notEmpty: true,
                maxLength: 4
            }
        },
        isCrypto: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'isCrypto',
            defaultValue: 0
        },
        createdAt: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'createdAt',
        },
        updatedAt: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'updatedAt',
        }
    }, { sequelize, modelName: 'currency' });
}