import db from "@astrojs/db";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import simpleStackForm from "simple-stack-form";

// import sentry from "@sentry/astro";
// import spotlightjs from "@spotlightjs/astro";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [
    simpleStackForm(),
    db(),
    // sentry(),
    // spotlightjs()
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
