const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {


    return {
        devtool: 'source-map',
        mode: 'development',
        devServer: {
            host: "0.0.0.0",
            contentBase: path.join(__dirname),
            port: 80,
            historyApiFallback: true,
            proxy: {
                '/service': {
                    target: 'http://rp5gis.myxomopx.ru',
                    secure: false,
                    changeOrigin: true,
                }
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
            }
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
                    exclude: ["/node_modules"],
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
            })
        ]
    };
};
