import {ResponseType} from "../enums/response.type";

export interface ApiConfig {
    base_url: string;
    api_key?: string;
    response_type?: ResponseType;
}