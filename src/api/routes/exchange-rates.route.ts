import {AppRouteModel, RouteMethod} from "../../common/models/app-route.model";
import {KapibaraContext} from "../../common/entities/kapibara.context";

const exchangeRateRoute: AppRouteModel[] = [
    {
        prefix: 'api/rates',
        path: '/exchange-rates',
        method: RouteMethod.GET,
        handler: async (req, res, next) => {
            const dbx = new KapibaraContext();
            res.json({});
        }
    }
];

export default exchangeRateRoute;