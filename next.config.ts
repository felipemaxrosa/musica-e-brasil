import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Render estático + ISR (sem Cache Components, conforme o plano). */
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
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
