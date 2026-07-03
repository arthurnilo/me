const isGithubActions = process.env.GITHUB_ACTIONS === "true";

let basePath = "";
if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, "");
  basePath = `/${repo}`;
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  // Permite testar o dev server pelo celular na rede local (ex.: http://192.168.x.x:3000)
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "localhost"],
};

export default nextConfig;
