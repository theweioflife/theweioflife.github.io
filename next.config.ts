import type { NextConfig } from "next";

const repositoryName = process.env.NEXT_PUBLIC_GITHUB_PAGES_REPOSITORY?.trim();
const basePath = repositoryName ? `/${repositoryName.replace(/^\/|\/$/g, "")}` : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
