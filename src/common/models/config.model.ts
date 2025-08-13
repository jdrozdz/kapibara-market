export interface Config {
    port: number;
    env: string;
    enableView: boolean;
    viewsPath?: string;
    viewEngine?: string;
}