import {DatabaseSync} from "node:sqlite";

export class KapibaraContext {
    private readonly dbx?: DatabaseSync;
    public get context() { return this.dbx ?? null; }

    public constructor() {

    }
}