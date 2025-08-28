import {ajax} from "rxjs/ajax";
import {NBP_API} from "./nbp.config";
import {NbpResponseModel} from "./nbp-response.model";
import {Observable} from "rxjs";
import {NbpTable} from "./nbp-tables.enum";

export class NbpService {

    public getRatesByTable(table: NbpTable): Observable<NbpResponseModel> {
        return ajax.getJSON<NbpResponseModel>(`${NBP_API.base_url}/tables/${table}?format=${NBP_API.response_type}`);
    }

    public getAllRates(): Observable<NbpResponseModel> {
        return ajax.getJSON<NbpResponseModel>(`${NBP_API.base_url}/tables/${NBP_API.defaultTable}?format=${NBP_API.response_type}`);
    }

    public getLastRates(count = 10, table?: NbpTable): Observable<NbpResponseModel> {
        return ajax.getJSON<NbpResponseModel>(`${NBP_API.base_url}/tables/${table}/last/${count}?format=${NBP_API.response_type}`);
    }

    public getTodayRateByCurrencyCode(currency: string, table?: NbpTable): Observable<NbpResponseModel> {
        return ajax.getJSON<NbpResponseModel>(`${NBP_API.base_url}/rates/${table ?? NBP_API.defaultTable}/code/today?format=${NBP_API.response_type}`);
    }
}