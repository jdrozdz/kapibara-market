import {AppRouteModel, RouteMethod} from "../../common/models/app-route.model";
import {NbpService} from "../../common/services/nbp/nbp.service.ts";
import getCurrencies from "../../common/services/currency.service.ts";

const indexRouter: AppRouteModel[] = [
    {
        path: '/:code',
        method: RouteMethod.GET,
        handler: async (req, res, next) => {

            const currencies = await getCurrencies();
            let code: string = 'USD';

            if (req.method !== "GET" && req.params["code"]) {
                code = req.params.code;
            }
            const nbpService = new NbpService();
            let data: any[] = (await nbpService.getTodayRateByCurrencyCode(code))!.data.rates;
            const rate ={
                rateNo: data[0].no ?? '--',
                mid: data[0].mid ?? 0.00
            }

            res.render('index', { title: 'Kapibara Song', data:rate, currencies, code });
        }
    }
];

export default indexRouter;