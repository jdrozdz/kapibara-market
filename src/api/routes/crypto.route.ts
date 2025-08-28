import {AppRouteModel, RouteMethod} from "../../common/models/app-route.model";

const cryptoRoute: AppRouteModel[] = [
    {
        prefix: 'api',
        path: '/',
        method: RouteMethod.GET,
        handler: (req, res, next) => {
            res.json({
                "message": "Hello World"
            })
        }
    },
    {
        prefix: 'api',
        path: '/:id',
        method: RouteMethod.GET,
        handler: (req, res, next) => {
            res.json({
                "message": `Hello World ${req.params.id}`
            })
        }
    },
    {
        prefix: 'api',
        path: '/',
        method: RouteMethod.POST,
        handler: (req, res, next) => {
            console.log(req.body);
            const { id } = req.body || 'undefined';
            res.json({
                "message": `Hello World from POST`,
                "Information": Date.now(),
                id: id
            });
        }
    },
    {
        prefix: 'api',
        path: '/:id',
        method: RouteMethod.PUT,
        handler: (req, res, next) => {
            res.json({
                "message": `Hello World from PUT ${req.body}`
            })
        }
    },
    {
        prefix: 'api',
        path: '/:id',
        method: RouteMethod.DELETE,
        handler: (req, res, next) => {
            res.json({
                "message": `Hello World from DELETE ${req.params.id}`
            })
        }
    }
];

export default cryptoRoute;