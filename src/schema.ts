import type { AdapterAccount } from "@auth/core/adapters";
import {
	date,
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

export const userTypeEnum = pgEnum("userType", [
	"student",
	"instructor",
	"admin",
]);

export const users = pgTable("user", {
	id: text("id").notNull().primaryKey(),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: timestamp("emailVerified", { mode: "date" }),
	image: text("image"),
	userType: userTypeEnum("userType"),
});

export const accounts = pgTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccount["type"]>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	}),
);

export const sessions = pgTable("session", {
	sessionToken: text("sessionToken").notNull().primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
	}),
);

export const course = pgTable("course", {
	id: serial("id").primaryKey(),
	title: text("title"),
	description: text("description"),
	instructorId: text("instructorId").references(() => users.id, {
		onDelete: "cascade",
	}),
	// (e.g., programming, design, marketing)
	category: text("category"),
	// (e.g., beginner, intermediate, advanced)
	difficultyLevel: text("difficultyLevel"),
	createdAt: timestamp("createdAt").defaultNow(),
});

export const content = pgTable("content", {
	id: serial("id").primaryKey(),
	courseId: integer("courseId").references(() => course.id, {
		onDelete: "cascade",
	}),
	// (e.g., video, text, quiz)
	contentType: text("contentType"),
	title: text("title"),
	// (text content, video URL, etc.)
	data: text("data"),
	// (sequence within the course)
	order: integer("order"),
});

export const enrollment = pgTable("enrollment", {
	id: serial("id").primaryKey(),
	userId: text("userId").references(() => users.id, { onDelete: "cascade" }),
	courseId: integer("courseId").references(() => course.id, {
		onDelete: "cascade",
	}),
	enrollmentDate: date("date"),
	// (percentage completed, optional)
	progress: integer("progress"),
});
