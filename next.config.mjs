/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["cdn.sanity.io"],
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint errors during build
  },
  // Disable static export and force SSR
  output: "standalone",
  experimental: {
    // Remove appDir as it's causing the invalid config warning
    // appDir: false, // Commented out
  },
  // Dynamically generate routes to avoid static export issues
  trailingSlash: false,
  generateBuildId: async () => {
    return "build-" + Date.now();
  },
  // Add custom webpack config to handle server-side rendering issues
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;