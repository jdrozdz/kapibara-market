import {ApiConfig} from "../../../common/models/api-config.model";
import {NbpTable} from "./nbp-tables.enum";

export interface NbpApiConfigModel extends ApiConfig {
    defaultTable: NbpTable;
}