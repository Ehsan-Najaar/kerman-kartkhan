const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // ✅ این خط رو اضافه کن
})

module.exports = withPWA({
  reactStrictMode: true,
  redirects: async () => [
    {
      source: '/',
      destination: '/landing',
      permanent: false,
    },
  ],
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
})
