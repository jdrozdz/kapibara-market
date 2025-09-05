import {AppSetup} from '../common/app';
import config from "./config/config";
import indexRouter from "./routes/index.router";

const app = new AppSetup(config);

app.configureRoutes(indexRouter);

app.start();