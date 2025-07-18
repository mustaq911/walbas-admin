/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'walbas-product.s3.us-east-2.amazonaws.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'walbaseproduct.s3.us-east-2.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/products/:path*',
        destination: 'http://3.148.182.60:8081/products/:path*',
      },
    ];
  },
};

module.exports = nextConfig;