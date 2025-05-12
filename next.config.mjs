/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/landing',
        permanent: false,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'kerman-kartkhan-2.storage.c2.liara.space',
      },
      {
        protocol: 'https',
        hostname: 'storage.c2.liara.space',
      },
    ],
  },
}

export default nextConfig
