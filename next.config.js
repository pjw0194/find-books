/** @type {import('next').NextConfig} */
const API_KEY = process.env.API_KEY;
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/books",
        destination: `https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;
