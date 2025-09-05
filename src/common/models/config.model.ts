export interface Config {
    port: number;
    env: string;
    api_url: string;
    app_url: string;
    enableView: boolean;
    viewsPath?: string;
    viewEngine?: string;
}