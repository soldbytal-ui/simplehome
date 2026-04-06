/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'd101qgvxw5fp3p.cloudfront.net',
      },
    ],
  },
};

export default nextConfig;
