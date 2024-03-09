import type { AuthConfig } from "@auth/core";
// import PasskeyProvider from "@auth/core/providers/passkey";
import GitHubProvider from "@auth/core/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";

export default {
	adapter: DrizzleAdapter(db),
	providers: [
		GitHubProvider({
			clientId: "beb7d9600d0222b7f585",
			clientSecret: "ab83bf35087ae339cb178c87c97119d1b3c39f17",
		}),
		// PasskeyProvider,
	],
} satisfies AuthConfig;
