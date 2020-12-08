const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {WebpackPluginServe} = require('webpack-plugin-serve');

const convert = require('koa-connect');
const history = require('connect-history-api-fallback');
const {createProxyMiddleware : proxy} = require('http-proxy-middleware');


module.exports = (env, argv) => {
    if (!env) env = {};
    const PRODUCTION = argv.mode === "production";

    const REPLACEMENTS = {}

    return {
        devtool: 'source-map',
        mode: PRODUCTION ? 'production' : 'development',
        entry: {
            index: './src/index.tsx',
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        },
        module: {
            rules: [
                // Правило для .ts .tsx
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/,
                },
                // Правило подгрузки sass, scss, css
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: './style'
                            }
                        },
                        'css-loader',
                        'sass-loader'
                    ]
                },
                // Правило подставки $WEBPACK: переменных
                {
                    test: /(\.(sa|sc|c)ss|\.[tj]sx?)$/,
                    exclude: /node_modules/,
                    loader: 'string-replace-loader',
                    options: {
                        multiple: REPLACEMENTS
                    }
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "style/style-[id].css",
                chunkFilename: "style/style-[id].css"
            }),
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: "./src/ui/assets/",
                        to: "./assets"
                    },
                    {from: "./node_modules/antd/dist/antd.min.css", to: "./css/antd.min.css"}
                ]
            }),
            new HtmlWebpackPlugin({
                template: "./src/index.html",
                filename: "index.html",
                base: "/",
            }),
            new HtmlWebpackTagsPlugin({
                tags: [
                    {type: "css", path: "./css/antd.min.css"}
                ]
            }),
            new WebpackPluginServe({
                "port": 80,
                "host": "0.0.0.0",
                "historyFallback": true,
                "static": "dist",
                middleware: (app, middleware, options) => {
                    app.use(convert(proxy('/service', { target: 'http://rp5gis.myxomopx.ru', secure: false, changeOrigin: true })));
                    app.use(convert(history()));
                }
            }),
        ],
        watch: !PRODUCTION
    };
};
