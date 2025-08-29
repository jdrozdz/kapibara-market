import {AppRouteModel, RouteMethod} from "../../common/models/app-route.model";
import {ctx} from "../../common/entities/kapibara.context";
import CurrencyEntity from "../../common/entities/currency.entity";

const exchangeRateRoute: AppRouteModel[] = [
    {
        prefix: 'api/rates',
        path: '/exchange-rates',
        method: RouteMethod.GET,
        handler: async (req, res, next) => {
            try {
                await ctx.authenticate();
                const [data, metadata] = await CurrencyEntity.findAll({});
                res.status(200).json([data]);
            } catch (err: any) {
                res.status(500).json({
                    message: err.message ?? 'Internal Server Error',
                    statusCode: 500,
                    status: 'FAILED'
                });
            }
        }
    },
    {
        prefix: 'api/rates',
        path: '/exchange-rates',
        method: RouteMethod.POST,
        handler: async (req, res, next) => {
            try {
                await ctx.authenticate();
                const data = await CurrencyEntity.create(req.body);
                await data.save();
                res.status(200).json(data);
            } catch (err: any) {
                res.status(500).json({
                    message: err.message ?? 'Internal Server Error',
                    statusCode: 500,
                    status: 'FAILED'
                });
            }
        }
    },
    {
        prefix: 'api/rates',
        path: '/exchange-rates/:id',
        method: RouteMethod.DELETE,
        handler: async (req, res, next) => {
            await ctx.authenticate();
            const currency = await CurrencyEntity.findByPk(req.params.id);
            if (!currency) {
                res.status(404).json({
                    message: 'Not Found',
                    statusCode: 404
                });
            } else {
                try {
                    const code: string = currency.dataValues.code;
                    await currency.destroy();
                    res.status(200).json({
                        message: `${code} deleted`,
                        statusCode: 200,
                        status: 'SUCCESS'
                    });
                } catch (err: any) {
                    res.status(500).json({
                        message: err.message ?? 'Internal Server Error',
                        statusCode: 500,
                        status: 'FAILED'
                    });
                }
            }
        }
    }
];

export default exchangeRateRoute;