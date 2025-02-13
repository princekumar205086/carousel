/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: "joy.videvo.net",
        },
      ],
    },
  };
  
  export default nextConfig;