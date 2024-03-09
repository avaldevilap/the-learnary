import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString:
      "postgresql://the-learnary:the-learnary@localhost:5432/the-learnary",
  },
} satisfies Config;
