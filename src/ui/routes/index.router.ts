import {AppRouteModel, RouteMethod} from "../../common/models/app-route.model";

const indexRouter: AppRouteModel[] = [
    {
        path: '/',
        method: RouteMethod.GET,
        handler: (req, res, next) => {
            res.render('index', { title: 'Kapibara Song' });
        }
    }
];

export default indexRouter;