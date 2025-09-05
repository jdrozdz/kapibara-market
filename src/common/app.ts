import express, {Express} from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {errorHandlerMiddleware} from "./middleware/error-handler.middleware";
import {Config} from "./models/config.model";
import _debug from "debug";
import {AppRouteModel} from "./models/app-route.model";
import {ctx} from "./entities/kapibara.context.ts";

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
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cookieParser());
        const public_dir = path.join(__dirname, '..', '..', 'public');
        console.log(`Public dir: ${public_dir}`);
        this.app.use(express.static(public_dir));
        this.app.use(errorHandlerMiddleware);
    }

    public configureRoutes(routes: AppRouteModel[]) {
        routes.forEach(route => {
            const prefix: string = route.prefix ? `/${route.prefix}` : '';
            const routePath = `${prefix}${route.path}`;
            this.app[route.method](routePath, route.handler);
        });
    }

    public start(): void {
        const debug = _debug('kapibara-server');
        if (this.config.enableView) {
            this.app.listen(this.config.port, () => {
                debug(`Server started on port ${this.config.port}`);
            });
        } else {
            ctx.sync({force: false}).then(() => {
                this.app.listen(this.config.port, () => {
                    debug(`Server started on port ${this.config.port}`);
                });
            });
        }
    }
}