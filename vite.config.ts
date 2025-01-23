import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "404.html", // Path to your 404.html in the root
          dest: ".", // Copy it to the root of the dist folder
        },
      ],
    }),
  ],
  base: "/hw/",
});
