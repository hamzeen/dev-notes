import type { NextConfig } from "next";

const isGitHubActions = process.env.GITHUB_ACTIONS === "true";
const repositoryBasePath = "/dev-notes";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGitHubActions ? repositoryBasePath : "",
  assetPrefix: isGitHubActions ? repositoryBasePath : "",
};

export default nextConfig;
