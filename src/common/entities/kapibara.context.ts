import dotenv from "dotenv";
import * as path from "path";
import {DbConfigurationMode} from "../enums/db-configuration.mode";
import {importModels, Sequelize} from "@sequelize/core";
import {OPEN_READWRITE, OPEN_URI, SqliteDialect} from "@sequelize/sqlite3";
import {PostgresDialect} from "@sequelize/postgres";
import {DbDialectType} from "../enums/db-dialect.type";
import {MySqlDialect} from "@sequelize/mysql";
import {AzKeyVaultConfig} from "../configs/az-key-vault.config.ts";

dotenv.config({ path: `.env.local`, override: true });

export class KapibaraContext {
    static DB_CONFIG_MODE: DbConfigurationMode = DbConfigurationMode.ENV;
    static IN_MEMORY: boolean = false;
    get instance() {
        return this._instance;
    }

    private name: string = "kapibara-app";
    private host?: string;
    private port?: number;
    private password?: string | undefined;
    private username?: string | undefined;
    private _instance!: Sequelize;
    private dialect: DbDialectType = DbDialectType.PostgreSQL;
    private readonly entitiesPath: string = path.resolve('src/common/entities/**/*.entity.{ts}');

    private get isSqlite(): boolean {
        return this.dialect === 'sqlite3';
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
    constructor(name?: string, dialect?: DbDialectType, host?: string, port?: number, username?: string, password?: string) {
        if((name || dialect || host || port || username || password) && KapibaraContext.DB_CONFIG_MODE === DbConfigurationMode.CONSTRUCTOR) {
            this.name = name!;
            this.dialect = dialect!;
            this.host = host!;
            this.port = port!;
            this.username = username ?? undefined;
            this.password = password ?? undefined;
        } else if (KapibaraContext.DB_CONFIG_MODE === DbConfigurationMode.ENV) {
            this.configureWithEnv();
        } else if (KapibaraContext.DB_CONFIG_MODE === DbConfigurationMode.AZURE) {
            this.configureWithAzure();
        } else {
            throw Error(`Database configuration mode doesn't exist`);
        }
    }

    public async build() {
        if(this.isSqlite) {
            this._instance = new Sequelize({
                models: await importModels(this.entitiesPath),
                dialect: SqliteDialect,
                storage: this.dbPath,
                mode: OPEN_READWRITE | OPEN_URI,
            });
        } else if(KapibaraContext.IN_MEMORY) {
            this._instance = new Sequelize({
                models: await importModels(this.entitiesPath),
                dialect: SqliteDialect,
                storage: ':memory:',
                pool: { max: 1, idle: Infinity, maxUses: Infinity }
            });
        } else if(this.dialect === DbDialectType.MySQL) {
            this._instance = new Sequelize({
                models: await importModels(this.entitiesPath),
                dialect: MySqlDialect,
                database: this.name,
                user: this.username!,
                password: this.password!,
                host: this.host!,
                port: this.port!,
            })
        } else {
            this._instance = new Sequelize({
                models: await importModels(this.entitiesPath),
                database: this.name,
                user: this.username!,
                password: this.password!,
                host: this.host!,
                port: this.port!,
                dialect: PostgresDialect,
                ssl: false
            });
        }
        return this._instance;
    }

    private configureWithEnv(): void {
        this.name = process.env.DB_NAME as string;
        this.dialect = process.env.DB_DIALECT as DbDialectType ?? DbDialectType.PostgreSQL;
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
        this.dialect = process.env.DB_DIALECT as DbDialectType ?? DbDialectType.PostgreSQL;
        this.host = process.env.DB_HOST as string ?? 'localhost';
        this.port = Number(process.env.DB_PORT) ?? '5432';
    }
}

export const dbx = new KapibaraContext();