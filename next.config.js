/** @type {import('next').NextConfig} */
// const withTranspile = require('next-transpile-modules')(['ol', 'rlayers']);

const nextConfig = {
  experimental: {
    instrumentationHook: true,
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['mongoose'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
