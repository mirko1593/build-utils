const webpack = require('webpack');

module.exports = () => ({
    output: {
        filename: '[name].js',
        chunkFilename: '[name].lazy-chunk.js',
        pathinfo: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ['vue-style-loader', 'css-loader', 'postcss-loader']
            }
        ]
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    plugins: [new webpack.ProgressPlugin()]
});
