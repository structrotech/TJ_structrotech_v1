/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["10.25.170.7"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
