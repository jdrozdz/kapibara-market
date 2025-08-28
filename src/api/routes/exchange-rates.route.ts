import {AppRouteModel, RouteMethod} from "../../common/models/app-route.model";
import {dbx} from "../../common/entities/kapibara.context";
import {CurrencyEntity} from "../../common/entities/currency.entity";

const exchangeRateRoute: AppRouteModel[] = [
    {
        prefix: 'api/rates',
        path: '/exchange-rates',
        method: RouteMethod.GET,
        handler: async (req, res, next) => {
            const ctx = await dbx.build();
            await ctx.authenticate();
            if(CurrencyEntity.isInitialized()) {

            } else {
                res.statusCode = 500;
                res.send({ status: "FAILED", message: 'Model is not initialized.' });
            }
        }
    }
];

export default exchangeRateRoute;