import type { AuthConfig } from "@auth/core";
// import PasskeyProvider from "@auth/core/providers/passkey";
import GitHubProvider from "@auth/core/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";

export default {
	adapter: DrizzleAdapter(db),
	providers: [
		GitHubProvider({
			clientId: import.meta.env.GITHUB_CLIENT_ID,
			clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
		}),
		// PasskeyProvider,
	],
} satisfies AuthConfig;
