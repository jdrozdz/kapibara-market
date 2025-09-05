import {ApiConfig} from "../../models/api-config.model.ts";
import {NbpTable} from "./nbp-tables.enum.ts";

export interface NbpApiConfigModel extends ApiConfig {
    defaultTable: NbpTable;
}