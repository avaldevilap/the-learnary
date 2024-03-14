import { Database } from "bun:sqlite";
import { dbUrl } from "astro:db";
import { BunSQLiteAdapter } from "@lucia-auth/adapter-sqlite";
import { GitHub } from "arctic";
import { Lucia } from "lucia";

console.log("DB_URL", dbUrl);

const db = new Database(
	// "/Users/avaldevilap/Documents/GitHub/the-learnary/.astro/content.db",
	dbUrl,
);

const adapter = new BunSQLiteAdapter(db, {
	user: "user",
	session: "session",
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: import.meta.env.PROD,
		},
	},
});

export const github = new GitHub(
	import.meta.env.GITHUB_CLIENT_ID,
	import.meta.env.GITHUB_CLIENT_SECRET,
);

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}
