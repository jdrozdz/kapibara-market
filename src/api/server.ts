import {AppSetup} from '../common/app';
import config from "./configs/app.config";
import cryptoRoute from "./routes/crypto.route";
import exchangeRateRoute from "./routes/exchange-rates.route";

const app = new AppSetup(config);

// app.configureRoute('/', indexRoute);
app.configureRoutes([...cryptoRoute, ...exchangeRateRoute]);

app.start();