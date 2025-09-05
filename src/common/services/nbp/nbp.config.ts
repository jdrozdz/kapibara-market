import {ApiConfig} from "../../models/api-config.model.ts";
import {ResponseType} from "../../enums/response.type.ts";
import {NbpApiConfigModel} from "./nbp-api-config.model.ts";
import {NbpTable} from "./nbp-tables.enum.ts";

export const NBP_API: NbpApiConfigModel = {
    base_url: 'https://api.nbp.pl/api/exchangerates',
    response_type: ResponseType.JSON,
    defaultTable: NbpTable.A
}
