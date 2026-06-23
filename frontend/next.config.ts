import type { NextConfig } from "next"

const isGithubPages = process.env.GITHUB_PAGES === "true"
const basePath = isGithubPages ? "/portfolio-nextjs" : ""

const nextConfig: NextConfig = {
    output: "export",
    basePath,
    assetPrefix: basePath ? `${basePath}/` : undefined,
    trailingSlash: true,
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
    compiler: {
        removeConsole: process.env.NEXT_PUBLIC_DEBUG === "false",
    },
    images: {
        unoptimized: true,
    },
}

export default nextConfig
