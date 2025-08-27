import {ajax} from "rxjs/ajax";
import {NBP_API} from "../configs/api.config";
import {NbpResponseModel} from "./nbp/nbp-response.model";
import {Observable} from "rxjs";

export class NbpService {

    public getAllRates(): Observable<NbpResponseModel> {
        return ajax.getJSON(NBP_API.base_url);
    }
}