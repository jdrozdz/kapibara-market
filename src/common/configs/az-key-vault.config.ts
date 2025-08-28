import {DefaultAzureCredential} from "@azure/identity";
import {SecretClient} from "@azure/keyvault-secrets";
import * as dotenv from "dotenv";


export class AzKeyVaultConfig {
    private get instance(): SecretClient {
        const credentials = new DefaultAzureCredential();
        return new SecretClient(this._url, credentials)
    }
    private get _url(): string {
        dotenv.config({ path: `.env.local`, override: true });
        return process.env.KEY_VAULT_URL ?? '';
    }
    private get isEnabled(): boolean {
        return Boolean(process.env.AZ_KEYVAULT_ENABLED);
    }

    public async getValue(key: string) {
        if(this.isEnabled) {
            const data = await this.instance.getSecret(key);
            return data.value as string;
        }
        throw new Error(`Azure Key Vault is not enabled!`);
    }
}