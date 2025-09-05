import {NBP_API} from "./nbp.config.ts";
import {NbpResponseModel} from "./nbp-response.model.ts";
import {NbpTable} from "./nbp-tables.enum.ts";
import axios from "axios";
import moment from "moment";

export class NbpService {

    public getRatesByTable(table: NbpTable) {
        return axios.get<NbpResponseModel>(`${NBP_API.base_url}/tables/${table}?format=${NBP_API.response_type}`);
    }

    public getAllRates() {
        return axios.get<NbpResponseModel>(`${NBP_API.base_url}/tables/${NBP_API.defaultTable}?format=${NBP_API.response_type}`);
    }

    public getLastRates(count = 10, table?: NbpTable) {
        return axios.get<NbpResponseModel>(`${NBP_API.base_url}/tables/${table}/last/${count}?format=${NBP_API.response_type}`);
    }

    public getTodayRateByCurrencyCode(currency: string, table?: NbpTable) {
        return axios.get<NbpResponseModel>(`${NBP_API.base_url}/rates/${table ?? NBP_API.defaultTable}/${currency}/today?format=${NBP_API.response_type}`);
    }

    public getRatesBetween(currency: string, start: Date, end: Date, table?: NbpTable) {
        const url = `${NBP_API.base_url}/rates/${table ?? NBP_API.defaultTable}/${currency}/${moment(start).format("YYYY-MM-DD")}/${moment(end).format("YYYY-MM-DD")}?format=${NBP_API.response_type}`;
        return axios.get<NbpResponseModel>(url);
    }
}