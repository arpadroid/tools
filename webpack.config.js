const argv = require('yargs').argv;
const MODE = argv.mode === 'production' ? 'production' : 'development';
const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (async () => {
    return [
        {
            entry: path.resolve(__dirname, 'index.js'),
            target: 'web',
            mode: 'production',
            stats: 'errors-only',
            resolve: {
                extensions: ['.js']
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                targets: {
                                    esmodules: true
                                }
                            }
                        }
                    }
                ]
            },
            cache: {
                type: 'filesystem'
            },
            output: {
                path: path.resolve(__dirname, 'dist'),
                clean: true,
                umdNamedDefine: true,
                chunkFilename: '[id].js',
                publicPath: '/',
                asyncChunks: false,
                filename: 'index.js',
                library: {
                    name: 'arpadroidTools',
                    type: 'umd'
                }
            },
            optimization: {
                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            keep_classnames: true
                        }
                    })
                ]
            },
            plugins: [
                // new BundleAnalyzerPlugin(),
                new webpack.optimize.ModuleConcatenationPlugin(),
                new webpack.DefinePlugin({
                    APPLICATION_MODE: JSON.stringify(MODE)
                })
            ]
        }
    ];
})();
