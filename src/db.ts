import * as schema from "@/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export type Course = typeof schema.course.$inferSelect
export type NewCourse = typeof schema.course.$inferInsert

export const db = drizzle(postgres(import.meta.env.DATABASE_URL), { schema });
