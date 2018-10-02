const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
// Используется для вотча html файлов и тригера перезагрузки браузера, без него браузер не перезапускается при изменении html файла
const HtmlWebpackPlugin = require('html-webpack-plugin');

const extractCss = new ExtractTextPlugin({
    filename: '[name].css',
    allChunks: true
});

module.exports = {
    stats: { children: false },
    entry: {
        landing: ['babel-polyfill', path.resolve(__dirname, '../public/js/Landing'), path.resolve(__dirname, '../public/styles/Landing')]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../build/'),
        sourceMapFilename: '[name].js.map'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.less']
    },
    module: {
        loaders: [{
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['env', 'react', 'stage-0']
                }
            }, {
                test: /\.less$/,
                use: extractCss.extract({
                    use: [{
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            config: {
                                path: path.resolve(__dirname, 'postcss.config.js')
                            }
                        }
                    }, {
                        loader: 'less-loader'
                    }],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        extractCss,
        // Для перезагрузки браузера при изменении html
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html')
        }),
        new BrowserSyncPlugin({
            // browse to http://localhost:3000/ during development
            host: 'localhost',
            port: 3000,
            server: { baseDir: [path.resolve(__dirname, '../')] }
        })
    ],
};
