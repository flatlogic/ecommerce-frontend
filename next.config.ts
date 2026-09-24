import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    // Legacy screens use native <img> tags and expect imported assets to be URLs.
    disableStaticImages: true,
  },
  turbopack: {
    root: process.cwd(),
    resolveAlias: {
      components: "./components",
      constants: "./constants",
      core: "./core",
      styles: "./styles",
      public: "./public",
      pages: "./legacy-pages",
      "legacy-pages": "./legacy-pages",
    },
  },
  sassOptions: {
    silenceDeprecations: [
      "import",
      "global-builtin",
      "color-functions",
      "if-function",
    ],
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.resolve(process.cwd(), "components"),
      constants: path.resolve(process.cwd(), "constants"),
      core: path.resolve(process.cwd(), "core"),
      styles: path.resolve(process.cwd(), "styles"),
      public: path.resolve(process.cwd(), "public"),
      pages: path.resolve(process.cwd(), "legacy-pages"),
      "legacy-pages": path.resolve(process.cwd(), "legacy-pages"),
    };
    config.module.rules.push({
      test: /\.(?:gif|jpe?g|png|svg|webp)$/i,
      issuer: /\.[jt]sx?$/,
      type: "asset/resource",
      generator: { filename: "static/media/[name].[contenthash][ext]" },
    });
    return config;
  },
};

export default nextConfig;
