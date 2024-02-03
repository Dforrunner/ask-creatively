/** @type {import('next').NextConfig} */

const nextConfig = {
  sassOptions: {
    includePaths: ['/styles/**'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.tenor.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media1.tenor.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
