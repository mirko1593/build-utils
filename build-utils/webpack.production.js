const glob = require('glob-all');
const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

module.exports = () => {
    return {
        output: {
            filename: '[name].[chunkhash].js',
            chunkFilename: '[chunkhash].lazy-chunk.js',
            pathinfo: false
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader'
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: './../css/[name].[chunkhash].css',
                chunkFilename: './../css/[chunkhash].lazy-chunk.css'
            }),
            new OptimizeCssAssetsPlugin(),
            new PurgecssPlugin({
                paths: glob.sync([
                    path.join(
                        `${__dirname}/../`,
                        './resources/views/**/*.html'
                    ),
                    path.join(
                        `${__dirname}/../`,
                        './resources/views/**/*.blade.php'
                    ),
                    path.join(`${__dirname}/../`, './resources/js/**/*.vue'),
                    path.join(`${__dirname}/../`, './resources/js/**/*.js')
                ]),
                defaultExtractor: content =>
                    content.match(/[A-Za-z0-9-_:/]+/g) || []
            })
        ],
        resolve: {
            alias: {
                vue: 'vue/dist/vue.min.js'
            }
        }
    };
};
