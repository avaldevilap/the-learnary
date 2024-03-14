import { db } from "astro:db";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { GitHub } from "arctic";
import { Lucia } from "lucia";

const adapter = new BetterSqlite3Adapter(db, {
	user: "User",
	session: "Session",
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
