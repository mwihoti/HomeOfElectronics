/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['cdn.sanity.io'],
    },"compilerOptions": {
    "checkJs": false
  },
   
  };
  
  const config = {
    ...nextConfig,
  };
  
  export default config;
  