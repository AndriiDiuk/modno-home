import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/media/**",
      },
      // Додай свої домени для продакшену (S3/CDN тощо)
      // { protocol: "https", hostname: "assets.example.com", pathname: "/**" },
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
};

// Make sure you wrap your `nextConfig`
// with the `withPayload` plugin
export default withPayload(nextConfig);
