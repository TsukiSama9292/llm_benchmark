/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/llm_benchmark' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/llm_benchmark/' : '',
}

module.exports = nextConfig
