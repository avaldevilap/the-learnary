import db from "@astrojs/db";
import node from "@astrojs/node";
import { defineConfig } from "astro/config";
import simpleStackForm from "simple-stack-form";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [simpleStackForm(), db()],
  vite: {
    optimizeDeps: {
      exclude: ["oslo", "astro:db"],
    },
  },
});
