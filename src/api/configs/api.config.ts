import {ApiConfig} from "../../common/models/api-config.model";
import {ResponseType} from "../../common/enums/response.type";

const NBP_API: ApiConfig = {
    base_url: 'http://api.nbp.pl/api/exchangerates',
    response_type: ResponseType.JSON
}


export default NBP_API;