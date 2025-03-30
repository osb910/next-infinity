import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  serverExternalPackages: ['mongoose'],
  /**
   * allows us to specify which files should be included on a route-by-route basis. Here, we're saying that the '/src/dictionaries' folder should be made available for all routes (represented by the wildcard /*).
   * Essentially, we're telling Next: Hey, this application requires these files, please upload them along with the compiled application during deployment.
   */
  outputFileTracingIncludes: {
    '/*': [
      './public/**/*',
      './src/app/**/*',
      './src/data/**/*',
      './src/python/**/*',
      './src/dictionaries/**/*',
    ],
  },
  outputFileTracingExcludes: {
    '/*': [
      'node_modules/@swc/**/*',
      'node_modules/@esbuild/**/*',
      'node_modules/terser/**/*',
      'node_modules/webpack/**/*',
      'node_modules/canvas',
    ],
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
  // routes any requests starting with /api/py
  // to the Flask server running on http://127.0.0.1:5328
  rewrites: async () => {
    return [
      {
        source: '/api/py/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5328/api/:path*'
            : '/api/',
      },
    ];
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
