/**
 * Carga de plugins
 */
const HtmlWebpackPlugin = require('html-webpack-plugin'),
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    autoprefixer = require('autoprefixer')

const toolsPage = require('./tools')
var path = require('path');

module.exports = env => {

    return {

        // Establece el modo
        mode: 'development', // "production" | "development" | "none"
        devtool: 'source-m      ap',
        module: {
            rules: [{
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader: 'html-loader',
                        options: {
                            minimize: true
                        }
                    }],
                },
                {
                    test: /\.(css|scss)$/,
                    use: [
                        'style-loader',
                        MiniCssExtractPlugin.loader,
                        'css-loader?minimize&sourceMap',
                        {
                            loader: 'postcss-loader',
                            options: {
                                autoprefixer: {
                                    browser: ['last 2 versions']
                                },
                                sourceMap: true,
                                plugins: () => [autoprefixer]
                            }
                        },
                        'sass-loader?outputStyle=compressed&sourceMap'
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin(),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                file: './index.html'
            }),
            //...toolsPage.pages(env),
        ],
    }
}
