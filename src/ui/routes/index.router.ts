import {AppRouteModel, RouteMethod} from "../../common/models/app-route.model";
import {NbpService} from "../../common/services/nbp/nbp.service.ts";
import getCurrencies from "../../common/services/currency.service.ts";
import {areaChartConfig} from "../../common/configs/chart.config.ts";

const indexRouter: AppRouteModel[] = [
    {
        path: '/',
        method: RouteMethod.GET,
        handler: async (req, res, next) => {
            const nbpService = new NbpService();
            const currencies = await getCurrencies();
            let code: string = 'USD';

            if (req.method === "GET") {
                if (req.query["code"])
                    code = req.query.code?.toString();
                if(req.query["start"] && req.query["end"]) {
                    const data = await nbpService.getRatesBetween(
                        code,
                        new Date(req.query.start?.toString()),
                        new Date(req.query.end?.toString()),
                    );
                    data.data.rates.forEach(item => {
                        const d = new Date(item.effectiveDate);
                        areaChartConfig.series[0].data.push([
                            d.getTime(),
                            item.mid
                        ])
                    });
                    areaChartConfig.xaxis.min = (new Date(req.query.start!.toString())).getTime();
                }
            }



            let data: any[] = (await nbpService.getTodayRateByCurrencyCode(code))!.data.rates;
            const rate ={
                rateNo: data[0].no ?? '--',
                mid: data[0].mid ?? 0.00
            }

            res.render('index', { title: 'Kapibara Song', data:rate, currencies, code, chartOptions: areaChartConfig });
        }
    }
];

export default indexRouter;