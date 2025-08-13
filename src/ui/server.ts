import {AppSetup} from '../common/app';
import config from "./config/config";

const app = new AppSetup(config);

// app.configureRoute('/', indexRoute);
// app.configureRoutes(routes)

app.start();