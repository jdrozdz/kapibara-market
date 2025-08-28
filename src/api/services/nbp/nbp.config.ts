import {ApiConfig} from "../../../common/models/api-config.model";
import {ResponseType} from "../../../common/enums/response.type";
import {NbpApiConfigModel} from "./nbp-api-config.model";
import {NbpTable} from "./nbp-tables.enum";

export const NBP_API: NbpApiConfigModel = {
    base_url: 'https://api.nbp.pl/api/exchangerates',
    response_type: ResponseType.JSON,
    defaultTable: NbpTable.A
}
