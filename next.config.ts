import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Render estático + ISR (sem Cache Components, conforme o plano). */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
