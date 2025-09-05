import {CurrencyModel} from "../models/currency.model.ts";
import axios from "axios";
import config from "../../ui/config/config.ts";

export default async function getCurrencies(): Promise<CurrencyModel[]> {
    const data =  await axios.get<CurrencyModel[]>(`${config.api_url}/assets/data/currencies.json`);
    return data.data;
}
