import express, {Express, Router} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {errorHandlerMiddleware} from "./middleware/error-handler.middleware";
import {Config} from "./models/config.model";
import _debug from "debug";
import http from "http";
import {AppRouteModel} from "./models/app-route.model";

export class AppSetup {
    private app: Express = express();
    private config: Config;

    constructor(config: Config) {
        this.config = config;
        this.configure();
    }

    public configure(config?: Config): void {
        if (config !== undefined) {
            this.config = config;
        }
        console.log(
            `Config: ${JSON.stringify(this.config)}`
        )
        if (this.config.enableView) {
            this.app.set('views', path.join(__dirname, this.config.viewsPath || 'views'));
            this.app.set('view engine', this.config.viewEngine || 'twig');
        }
        this.app.use(logger('dev'));
        this.app.use(express.json());
//         this.app.use(express.urlencoded({extended: false}));
//        this.app.use(cookieParser());
//        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(errorHandlerMiddleware);
    }

    public configureRoute(path: string, route: Router) {
        this.app.use(path, route);
    }

    public configureRoutes(routes: AppRouteModel[]) {
        routes.forEach(route => {
            const router: Router = Router();
            router[route.method](route.path, route.handler);
            this.configureRoute(route.path, router);
        });
    }

    public start(): void {
        const debug = _debug('kapibara-server');
        this.app.listen(this.config.port, () => {
            debug(`Server started on port ${this.config.port}`);
        });
    }
}