/// <reference types="astro/client" />
interface ImportMetaEnv {
	readonly AUTH_TRUST_HOST: boolean;
	readonly AUTH_SECRET: string;
	readonly POSTGRES_HOST: string;
	readonly POSTGRES_PORT: string;
	readonly POSTGRES_DB: string;
	readonly POSTGRES_USER: string;
	readonly POSTGRES_PASSWORD: string;
	readonly DATABASE_URL: string;
	readonly GITHUB_CLIENT_ID: string;
	readonly GITHUB_CLIENT_SECRET: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
