/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="simple-stack-form/types" />

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

declare namespace App {
	interface Locals {
		session: import("lucia").Session | null;
		user: import("lucia").User | null;
	}
}
