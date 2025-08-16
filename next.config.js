/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/model_score' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/model_score/' : '',
}

module.exports = nextConfig
