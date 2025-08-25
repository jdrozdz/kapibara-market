import { NBP_API } from "../../common/models/api-config.model";
import {ajax} from "rxjs/ajax";

export class NbpService {

    public getAllRates() {
        return ajax.getJSON(NBP_API.base_url);
    }
}