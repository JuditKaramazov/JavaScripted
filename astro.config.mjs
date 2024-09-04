import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import customTheme from "./theme.json";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://javascripted.vercel.app",
  trailingSlash: "never",
  integrations: [react(), tailwind(), mdx(), sitemap()],
  output: "static",
  markdown: {
    shikiConfig: {
      theme: customTheme,
      langs: [],
      wrap: false
    }
  }
});