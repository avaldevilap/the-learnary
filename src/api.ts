import { createTRPCClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "@/server/_app";

export const client = createTRPCClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:4321/trpc" })],
});
