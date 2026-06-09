import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.172", "192.168.1.173"],
  output: 'standalone'
};

export default nextConfig;
