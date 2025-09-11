/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
      domains: ['cdn.sanity.io'],
    },
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
    // Disable static generation for problematic pages
    experimental: {
      largePageDataBytes: 128 * 1000, // 128KB
    },
    // Add webpack configuration to handle client-side only modules
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback = {
          ...config.resolve.fallback,
          fs: false,
          net: false,
          tls: false,
        };
      }
      return config;
    },
};
  
export default nextConfig;
