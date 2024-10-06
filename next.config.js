/**
 * @type { import("next").NextConfig }
 */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '/a/<APP_ID>/*'
      }
    ]
  },
  reactStrictMode: false
}
