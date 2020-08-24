const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ArcGISPlugin = require("@arcgis/webpack-plugin");
const DojoWebpackPlugin = require('dojo-webpack-plugin');

module.exports = (env) => {
    if (!env) env = {};
    const PRODUCTION = env.production === undefined ? false : env.production;
    const SW_ENABLED = env.sw === undefined ? true : env.sw;

    const API_URL = PRODUCTION ? "/api" : "http://192.168.1.25:5181"

    const REPLACEMENTS = [
        {search: '\\$WEBPACK_API_ADDRESS', replace:API_URL, flags: "g"},
        {search: '\\$WEBPACK_ENABLE_SW', replace:String(SW_ENABLED), flags: "g"},
    ];

    return {
        devtool: 'source-map',
        mode: PRODUCTION ? 'production' : 'development',
        devServer: {
            host: "0.0.0.0",
            contentBase: path.join(__dirname),
            headers: {'Access-Control-Allow-Origin': '*'},
            port: 80,
            historyApiFallback: true,
            proxy: {}
        },
        entry: {
            index: './src/index.tsx',
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name].js'
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".scss", ".css"]
        },
        node: {
            process: false,
            global: false,
            fs: 'empty',
        },
        module: {
            rules: [
                // Правило для .ts .tsx
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript-loader'
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
        externals: [
            (context, request, callback) => {
                if (/pe-wasm$/.test(request)) {
                    return callback(null, "amd " + request);
                }
                callback();
            }
        ],
        plugins: [
            new MiniCssExtractPlugin({
                filename: "style/style-[id].css",
                chunkFilename: "style/style-[id].css"
            }),
            new CopyWebpackPlugin([
                {from: "./src/ui/assets", to: "./assets"},
                {from: "./node_modules/antd/dist/antd.min.css", to: "./css"}
            ]),
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
            new ArcGISPlugin({
                features: {
                    "3d": false
                },
                locales: ["ru"]
            })
        ]
    };
};