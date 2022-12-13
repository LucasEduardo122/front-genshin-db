/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['static.wikia.nocookie.net', 'webstatic.hoyoverse.com', 'upload-os-bbs.mihoyo.com', 'genshin.honeyhunterworld.com']
  },
}

module.exports = nextConfig
