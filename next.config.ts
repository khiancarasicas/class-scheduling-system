import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/home/main/dashboard",
        permanent: true, // or false if it's temporary
      },
      {
        source: "/home/main",
        destination: "/home/main/dashboard",
        permanent: true,
      },
      {
        source: "/home/setup",
        destination: "/home/setup/departments",
        permanent: true,
      },
      {
        source: "/home/management",
        destination: "/home/management/manage-instructors",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
