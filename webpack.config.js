const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const webpackMerge = require('webpack-merge');
const modeConfig = mode => require(`./build-utils/webpack.${mode}`)(mode);
const loadPresets = require('./build-utils/loadPresets.js');
const path = require('path');

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
    return webpackMerge(
        {
            mode,
            entry: { app: './resources/js/app.js' },

            output: {
                path: path.resolve(__dirname, 'public/js'),
                publicPath: '/js/'
            },
            module: {
                rules: [
                    {
                        test: /\.vue$/,
                        use: ['vue-loader']
                    }
                ]
            },

            plugins: [
                new VueLoaderPlugin(),
                new CleanWebpackPlugin({
                    cleanOnceBeforeBuildPatterns: [
                        path.join(process.cwd(), 'public/js'),
                        path.join(process.cwd(), 'public/css')
                    ]
                }),
                new ManifestPlugin()
            ],
            optimization: {
                splitChunks: {
                    cacheGroups: {
                        vendor: {
                            name: 'vendor',
                            test: /[\\/]node_modules[\\/]/,
                            chunks: 'initial'
                        }
                    }
                }
            }
        },
        modeConfig(mode),
        loadPresets({ mode, presets })
    );
};
