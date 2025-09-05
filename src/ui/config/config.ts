import dotenv from 'dotenv';
import {Config} from "../../common/models/config.model";

dotenv.config({ path: `.env.local`, override: true });

const _apiURL: string = `${process.env.API_URL}:${process.env.API_PORT}` || 'http://localhost:3001';
const _appURL: string = `${process.env.APP_URL}:${process.env.PORT}` || 'http://localhost:3000';

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    env: process.env.NODE_ENV || 'development',
    api_url: _apiURL,
    app_url: _appURL,
    enableView: true,
    viewsPath: '../ui/views',
    viewEngine: 'ejs',
}


export default config;
