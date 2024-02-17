/** @type {import('next').NextConfig} */

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// });

const nextConfig = {
  experimental: {
    instrumentationHook: true,
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['mongoose'],
    /**
     * allows us to specify which files should be included on a route-by-route basis. Here, we're saying that the '/src/database.json' file should be made available for all routes (represented by the wildcard /*).
     * Essentially, we're telling Next: Hey, this application requires these files, please upload them along with the compiled application during deployment.
     */
    outputFileTracingIncludes: {
      '/*': ['./public/**/*', './src/app/**/*', './src/data/**/*'],
    },
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

// module.exports = withBundleAnalyzer({});

module.exports = nextConfig;
