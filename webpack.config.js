const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
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
        })
    ],
    devServer: {
        historyApiFallback: true,
        inline: true,
        host: 'localhost',
        port: 8080,
        proxy: {
            '/server/**': {
                target: 'http://localhost:3000',
                pathRewrite: {'^/server' : ''},
                secure: false,
                logLevel: 'debug'
            }
        },
    }
};