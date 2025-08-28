import dotenv from 'dotenv';
import {Config} from "../../common/models/config.model";

dotenv.config({ path: `.env.local`, override: true });

const config: Config = {
    port: Number(process.env.PORT) || 3000,
    env: process.env.NODE_ENV || 'development',
    enableView: true,
    viewsPath: '../ui/views',
    viewEngine: 'twig',
}


export default config;
