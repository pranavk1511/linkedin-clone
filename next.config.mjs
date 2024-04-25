/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'links.papareact.com',
          },
          {
            protocol: 'https',
            hostname: 'img.clerk.com',
          },
          {
            protocol: 'https',
            hostname: 'https://links.papareact.com/b3z',
          },
        ],
      },
};

export default nextConfig;
