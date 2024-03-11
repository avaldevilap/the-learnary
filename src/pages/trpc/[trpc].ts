import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import type { APIRoute } from "astro";
import { appRouter } from "@/server/_app";
import { createContext } from "@/server/context";

export const ALL: APIRoute = (opts) =>
  fetchRequestHandler({
    endpoint: "/trpc",
    req: opts.request,
    router: appRouter,
    createContext,
  });
