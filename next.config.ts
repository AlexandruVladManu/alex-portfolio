import type { NextConfig } from "next";

const repositoryName = "alex-portfolio";
const basePath = `/${repositoryName}`;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;
