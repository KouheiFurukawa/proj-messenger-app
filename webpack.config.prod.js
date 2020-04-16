const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const dist = __dirname + '/dist';

module.exports = {
    mode: 'production',
    entry: {
        main: './src/index.tsx',
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                enforce: 'pre',
                loader: 'tslint-loader',
                test: /\.tsx?$/,
                exclude: [
                    /node_modules/
                ],
                options: {
                    emitErrors: true
                }
            },
            {
                loader: 'ts-loader',
                test: /\.tsx?$/,
                exclude: [
                    /node_modules/
                ],
                options: {
                    configFile: 'tsconfig.json'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'static/js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new htmlWebpackPlugin({
            chunks: ['main'],
            filename: "index.html",
            template: "index.html"
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            swDest: dist + '/sw.js',
            clientsClaim: true,
            skipWaiting: true,
            maximumFileSizeToCacheInBytes: 20 * 1024 * 1024,
            exclude: [],
            runtimeCaching: [
                {
                    urlPattern: '/',
                    handler: 'StaleWhileRevalidate',
                },
                {
                    urlPattern: new RegExp('/server/login/'),
                    handler: 'NetworkOnly',
                },
                {
                    urlPattern: new RegExp('/server/logout/'),
                    handler: 'NetworkOnly',
                },
                {
                    urlPattern: new RegExp('/server/login_info/'),
                    handler: 'NetworkFirst',
                    options: {
                        cacheName: 'loginInfo',
                        expiration: {
                            maxEntries: 1,
                            maxAgeSeconds: 24 * 60 * 60,
                        },
                    },
                },
                {
                    urlPattern: new RegExp('/server/'),
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'api',
                        expiration: {
                            maxEntries: 100,
                            maxAgeSeconds: 72 * 60 * 60
                        },
                        cacheableResponse: { statuses: [0, 200] },
                    }
                },
            ],
        }),
    ],
    devServer: {
        historyApiFallback: true,
        inline: true,
        host: 'localhost',
        port: 8080,
        proxy: {
            '/server/**': {
                target: 'http://localhost:3000',
                secure: false,
                logLevel: 'debug'
            }
        },
    }
};