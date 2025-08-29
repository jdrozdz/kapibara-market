import dotenv from "dotenv";
import * as path from "path";
import {DbConfigurationMode} from "../enums/db-configuration.mode";
import {Sequelize} from "sequelize";
import {AzKeyVaultConfig} from "../configs/az-key-vault.config.ts";

dotenv.config({path: `.env.local`, override: true});

export class KapibaraContext {
    static DB_CONFIG_MODE: DbConfigurationMode = DbConfigurationMode.ENV;
    static IN_MEMORY: boolean = false;

    private name: string = "kapibara-app";
    private host?: string;
    private port?: number;
    private password?: string | undefined;
    private username?: string | undefined;
    private _instance!: Sequelize;
    private dialect: 'postgres' | 'mysql' | 'sqlite' = 'postgres';

    private get isSqlite(): boolean {
        return this.dialect === 'sqlite';
    };

    private get az() {
        return new AzKeyVaultConfig();
    }

    private get dbPath(): string {
        return this.name && !this.isSqlite ? path.resolve(this.name) : 'database name was not defined! or dialect is not SQLite';
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
        if ((name || dialect || host || port || username || password) && KapibaraContext.DB_CONFIG_MODE === DbConfigurationMode.CONSTRUCTOR) {
            this.name = name!;
            this.dialect = dialect!;
            this.host = host!;
            this.port = port!;
            this.username = username ?? undefined;
            this.password = password ?? undefined;
        }
    }

    // public async build(): Promise<Sequelize> {
    //     await this.configure();
    public build(): Sequelize {
        this.configureWithEnv();
        if (this.isSqlite) {
            this._instance = new Sequelize({
                dialect: this.dialect,
                storage: this.dbPath,
            });
        } else if (KapibaraContext.IN_MEMORY) {
            this._instance = new Sequelize({
                dialect: this.dialect,
                storage: ':memory:',
                pool: {max: 1, idle: Infinity, maxUses: Infinity}
            });
        } else {
            this._instance = new Sequelize(this.name, this.username!, this.password, {
                dialect: this.dialect,
                host: this.host!,
                port: this.port!,
            })
        }
        return this._instance;
    }

    public async configure(): Promise<void> {
        if (KapibaraContext.DB_CONFIG_MODE === DbConfigurationMode.ENV) {
            this.configureWithEnv();
        } else if (KapibaraContext.DB_CONFIG_MODE === DbConfigurationMode.AZURE) {
            await this.configureWithAzure();
        } else {
            throw Error(`Database configuration mode doesn't exist`);
        }
    }

    private configureWithEnv(): void {
        this.name = process.env.DB_NAME as string;
        this.dialect = process.env.DB_DIALECT as 'postgres' | 'mysql' | 'sqlite' ?? 'postgres';
        this.host = process.env.DB_HOST as string ?? 'localhost';
        this.port = Number(process.env.DB_PORT) ?? '5432';
        this.username = process.env.DB_USERNAME as string ?? undefined;
        this.password = process.env.DB_PASSWORD as string ?? undefined;
    }

    private async configureWithAzure(): Promise<void> {
        this.name = await this.az.getValue('db-name');
        this.username = await this.az.getValue('db-username');
        this.password = await this.az.getValue('db-password');

        this.dialect = process.env.DB_DIALECT as 'postgres' | 'mysql' | 'sqlite' ?? 'postgres';
        this.host = process.env.DB_HOST as string ?? 'localhost';
        this.port = Number(process.env.DB_PORT) ?? '5432';
    }
}

const dbx = new KapibaraContext();
export const ctx = dbx.build();
