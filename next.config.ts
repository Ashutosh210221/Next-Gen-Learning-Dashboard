import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Lint is run explicitly via `npm run lint`; keep it off the build's
    // critical path so deploys never break on a style nit. Types are still
    // fully checked during `next build`.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
