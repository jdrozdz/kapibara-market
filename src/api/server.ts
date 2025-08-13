import {AppSetup} from '../common/app';
import config from "./configs/app.config";
import cryptoRoute from "./routes/crypto.route";

const app = new AppSetup(config);

// app.configureRoute('/', indexRoute);
app.configureRoutes(cryptoRoute)

app.start();