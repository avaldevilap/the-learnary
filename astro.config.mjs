import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import auth from "auth-astro";
import simpleStackForm from "simple-stack-form";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  integrations: [auth({
    configFile: "./src/auth"
  }), simpleStackForm(), db()],
  vite: {
    plugins: [tailwindcss()]
  }
});