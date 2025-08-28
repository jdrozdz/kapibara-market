import dotenv from "dotenv";
import * as path from "path";
import {DbConfigurationMode} from "../enums/db-configuration.mode";
import {AzKeyVaultConfig} from "./az-key-vault.config";
import {Sequelize} from "sequelize";

dotenv.config({ path: `.env.local`, override: true });

export class DbConfig {
    static DB_CONFIG_MODE: DbConfigurationMode = DbConfigurationMode.ENV;
    static IN_MEMORY: boolean = false;
    private name: string = "kapibara-app";
    private host?: string;
    private port?: number;
    private password?: string | undefined;
    private username?: string | undefined;

    get dbPath(): string {
        return this.name && !this.isSqlite ? path.resolve(this.name) : 'database name was not defined! or dialect is not SQLite';
    }
    get instance() {
        return this._instance;
    }

    private readonly _instance;
    private dialect: 'postgres' | 'sqlite' | 'mysql' = 'postgres';
    private get isSqlite(): boolean {
        return this.dialect === 'sqlite';
    };
    private get az() {
        return new AzKeyVaultConfig();
    }


    /**
     * For testing purpose firstly set DbConfig.IN_MEMORY=true, then you can create object and use instance
     * @param name database name is required
     * @param dialect default postgres
     * @param host default 127.0.0.1
     * @param port default 5432
     * @param username default undefined
     * @param password default undefined
     */
    constructor(name?: string, dialect?: 'postgres' | 'mysql' | 'sqlite', host?: string, port?: number, username?: string, password?: string) {
        if((name || dialect || host || port || username || password) && DbConfig.DB_CONFIG_MODE === DbConfigurationMode.CONSTRUCTOR) {
            this.name = name!;
            this.dialect = dialect!;
            this.host = host!;
            this.port = port!;
            this.username = username ?? undefined;
            this.password = password ?? undefined;
        } else if (DbConfig.DB_CONFIG_MODE === DbConfigurationMode.ENV) {
            this.configureWithEnv();
        } else if (DbConfig.DB_CONFIG_MODE === DbConfigurationMode.AZURE) {
            this.configureWithAzure();
        } else {
            throw Error(`Database configuration mode doesn't exist`);
        }

        if(this.isSqlite) {
            this._instance = new Sequelize(this.dbPath, {
                dialect: this.dialect
            });
        } else if(DbConfig.IN_MEMORY) {
            this._instance = new Sequelize({
                dialect: 'sqlite',
                storage: ':memory:',
                pool: { max: 1, idle: Infinity, maxUses: Infinity }
            });
        } else {
            this._instance = new Sequelize(this.name, this.username!, this.password!, {
                host: this.host!,
                port: this.port!,
                dialect: this.dialect
            });
        }
    }

    private configureWithEnv(): void {
        this.name = process.env.DB_NAME as string;
        this.dialect = process.env.DB_DIALECT as 'postgres' | 'sqlite' | 'mysql' ?? 'postgres';
        this.host = process.env.DB_HOST as string ?? 'localhost';
        this.port = Number(process.env.DB_PORT) ?? '5432';
        this.username = process.env.DB_USERNAME as string ?? undefined;
        this.password = process.env.DB_PASSWORD as string ?? undefined;
    }

    private configureWithAzure(): void {
        (async () => {
            this.name = await this.az.getValue('db-name');
            this.username = await this.az.getValue('db-username');
            this.password = await this.az.getValue('db-password');
        })();
        this.dialect = process.env.DB_DIALECT as 'postgres' | 'sqlite' | 'mysql' ?? 'postgres';
        this.host = process.env.DB_HOST as string ?? 'localhost';
        this.port = Number(process.env.DB_PORT) ?? '5432';
    }
}
