const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/frontend/index.js',
    output: {
        path: path.resolve('public'),
        publicPath: '/'
    },
    mode: 'development',
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]'
                            }
                        }
                    },
                    { loader: 'less-loader' }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../frontend/static'),
                to: path.resolve(__dirname, '../../public'),
                ignore: [ '.*']
            }
        ]),
        new HtmlWebpackPlugin({
            filename: path.resolve(__dirname, '../../public/index.html'),
            template: path.resolve(__dirname, '../frontend/static/index.html'),
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
        }),
    ]
};