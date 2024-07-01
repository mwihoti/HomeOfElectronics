/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['cdn.sanity.io'],
    },
   
  };
  
  const config = {
    ...nextConfig,
  };
  
  export default config;
  