/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api-hambali-furniture.hidayatmauluddin.my.id/:path*',
      },
    ];
  },
};

module.exports = nextConfig;