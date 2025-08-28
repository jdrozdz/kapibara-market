import {Config} from "../../common/models/config.model";
import dotenv from 'dotenv';

dotenv.config({ path: `.env.local`, override: true });

const config: Config = {
    port: parseInt(process.env.PORT || '3001'),
    env: process.env.NODE_ENV || 'development',
    enableView: false
}

export default config;