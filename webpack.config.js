const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

function getViews() {
    const viewsPath = path.resolve(__dirname, 'src');
    const items = fs.readdirSync(viewsPath);

    return items
        .filter(item => /\.html$/.test(item))
        .map(filename => new HtmlWebpackPlugin({
            template: path.resolve(viewsPath, filename),
            filename: filename,
            favicon: "./src/favicon.ico"
        }));
}

module.exports = {
    entry: {
        main: "./src/js/index.js",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.[hash].min.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|webp|svg|gif|ico)$/,
                exclude: /icons/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img'
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts'
                    }
                }
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.[hash].min.css",
            chunkFilename: '[id].[hash].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        ...getViews(),
        // new HtmlWebpackPlugin({
        //     template: 'src/index.html',
        //     filename: "index.html",
        //     favicon: "./src/favicon.ico"
        // }),
        // new HtmlWebpackPlugin({
        //     template: 'src/apart-page.html',
        //     filename: "apart-page.html",
        // }),
        new SVGSpritemapPlugin("src/img/icons/*.svg", {
            output: {
                filename: "img/spritemap.svg",
                svg: {
                    sizes: false
                }
            }
        }),
    ],
    externals: {
        jquery: 'jQuery'
    }
};