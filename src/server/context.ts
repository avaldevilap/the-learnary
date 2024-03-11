import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getSession } from "auth-astro/server";

export async function createContext({ req }: FetchCreateContextFnOptions) {
  const session = await getSession(req);
  return { session };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
