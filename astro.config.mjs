import { defineConfig } from "astro/config";
import auth from "auth-astro";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";

import simpleStackForm from "simple-stack-form";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [
    auth({
      configFile: "./src/auth",
    }),
    simpleStackForm(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
