import {CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model} from "sequelize";
import {ctx as sequelize} from "./kapibara.context.ts";
import RatesEntity from "./rates.entity.ts";

class CurrencyEntity extends Model { }

CurrencyEntity.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            min: 5,
            max: 100
        }
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            min: 3,
            max: 4
        }
    },
    isCrypto: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    tableName: "currency",
    modelName: "CurrencyEntity",
});

export default CurrencyEntity;
