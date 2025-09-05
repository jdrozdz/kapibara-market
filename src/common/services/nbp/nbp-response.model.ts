import {NbpTable} from "./nbp-tables.enum.ts";
import {NbpRatesModel} from "./nbp-rates.model.ts";

export interface NbpResponseModel {
    table: NbpTable;
    currency: string;
    code: string;
    rates: NbpRatesModel[];
}