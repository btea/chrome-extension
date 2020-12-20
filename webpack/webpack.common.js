const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ReloadPlugin = require("../reloadPlugin");
const autoGetIp = require("../ast");

autoGetIp();

module.exports = {
    entry: {
        popup: "/src/popup.js",
        background: "/src/background.js",
        content: "/src/content.js",
    },
    output: {
        path: path.resolve(__dirname, "../extension"),
        filename: "js/[name].js",
        chunkFilename: "js/[name].js",
        publicPath: "./",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: "cache-loader",
                    },
                    {
                        loader: "thread-loader",
                    },
                    {
                        loader: "vue-loader",
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: "cache-loader",
                    },
                    {
                        loader: "thread-loader",
                    },
                    {
                        loader: "babel-loader",
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss|sass/,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require("dart-sass"),
                        },
                    },
                    {
                        loader: "postcss-loader",
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|webp|ico)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: "file-loader",
                                options: {
                                    name: "img/[name].[hash:8].[ext]",
                                },
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: "file-loader",
                                options: {
                                    name: "media/[name].[hash:8].[ext]",
                                },
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 4096,
                            fallback: {
                                loader: "file-loader",
                                options: {
                                    name: "fonts/[name].[hash:8].[ext]",
                                },
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     filename: "index.html",
        //     template: path.resolve(__dirname, "./public/index.html"),
        // }),
        new HtmlWebpackPlugin({
            filename: "popup.html",
            template: path.resolve(__dirname, "../public/popup.html"),
            chunks: ["popup"],
        }),
        new HtmlWebpackPlugin({
            filename: "background.html",
            template: path.resolve(__dirname, "../public/background.html"),
            chunks: ["background"],
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "public/manifest.json" },
                { from: "public/bai.png" },
                { from: "public/content.css" },
                // { from: 'extens/popup.html', to: 'extension' }
            ],
        }),
        /**
         * params Object
         * url(默认值为 https://github.com/) 指定插件生效的网址
         * 注：网址后面应带上 '/' 否则插件会报错  Invalid value for 'content_scripts[0].matches[0]': Empty path.
         */
        new ReloadPlugin({
            url: "https://www.bilibili.com/",
        }),
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        // new CleanWebpackPlugin(),
    ],
};
