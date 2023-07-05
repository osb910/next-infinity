const path = require('path');
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['mongoose'],
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
};

module.exports = nextConfig;
