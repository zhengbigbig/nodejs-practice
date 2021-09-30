const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});
const withPlugins = require('next-compose-plugins');

// next.js configuration
const nextConfig = {
    reactStrictMode: true,
}
module.exports = withPlugins([withBundleAnalyzer], {
    webpack: (config, {webpack, isServer, dev}) => {
        config.module.rules.push({
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[contenthash].[ext]',
                        outputPath: 'static', // disk path
                        publicPath: '_next/static' // net path
                    }
                },
            ],
        })
        return config
    }
}, nextConfig)