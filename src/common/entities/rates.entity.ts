import { DataTypes, Model} from "sequelize";
import CurrencyEntity from "./currency.entity";
import {ctx} from "./kapibara.context.ts";

class RatesEntity extends Model { }

RatesEntity.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    currencyId: {
        type: DataTypes.INTEGER,
        references: {
            model: CurrencyEntity,
            key: 'id'
        }
    },
    mid: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0
    },
    rateDate: {
        type: DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize: ctx,
    tableName: "rates",
    modelName: "RatesEntity",
});

export default RatesEntity;
