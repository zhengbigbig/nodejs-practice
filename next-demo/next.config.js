const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});
// https://www.npmjs.com/package/next-compose-plugins
const withPlugins = require('next-compose-plugins');
// https://www.npmjs.com/package/next-images
const withImages = require('next-images')

// next.js configuration
const nextConfig = {
    reactStrictMode: true,
}
module.exports = withPlugins([withImages,withBundleAnalyzer], {
    webpack: (config, {webpack, isServer, dev}) => {
        return config
    }
}, nextConfig)