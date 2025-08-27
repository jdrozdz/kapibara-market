import {NbpTable} from "./nbp-tables.enum";
import {NbpRatesModel} from "./nbp-rates.model";

export interface NbpResponseModel {
    table: NbpTable;
    currency: string;
    code: string;
    rates: NbpRatesModel[];
}