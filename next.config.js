/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['mongoose'],
  },
}

module.exports = nextConfig
