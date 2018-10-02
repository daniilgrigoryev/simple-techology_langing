const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCss = new ExtractTextPlugin({
    filename: 'styles.css',
    allChunks: true
});

module.exports = {
    stats: 'minimal',
    entry: {
        bundle: ['babel-polyfill', path.resolve(__dirname, '../src/js/main')],
        styles: path.resolve(__dirname, '../src/styles/index')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../build/')
    },
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
        extractCss
    ],
};
