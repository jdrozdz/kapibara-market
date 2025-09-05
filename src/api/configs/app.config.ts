import {Config} from "../../common/models/config.model";
import dotenv from 'dotenv';

dotenv.config({ path: `.env.local`, override: true });

const _apiURL: string = `${process.env.API_URL}:${process.env.API_PORT}` || 'http://localhost:3001';
const _appURL: string = `${process.env.API_URL}:${process.env.PORT}` || 'http://localhost:3000';

const config: Config = {
    port: parseInt(process.env.API_PORT || '3001'),
    env: process.env.NODE_ENV || 'development',
    enableView: false,
    api_url: _apiURL,
    app_url: _appURL,
}

export default config;