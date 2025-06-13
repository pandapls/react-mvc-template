
const parse = require('yargs-parser');
const { resolve } = require('path');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { ThemedProgressPlugin } = require('themed-progress-plugin');

const argv = parse(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const _modeflag = _mode === 'production' ? true : false;

const webpackBaseConfig = {

    entry: {
        main: resolve('src/index.tsx')
    },
    output: {
        path: resolve(process.cwd(), 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'swc-loader'
                }
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)/i,
                type: 'asset/resource'
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader',
                ],
            },
        ]
    },
    resolve: {
        alias: {
            '@': resolve('src/'),
            '@components': resolve('src/components'),
            '@hooks': resolve('src/hooks'),
            '@pages': resolve('src/pages'),
            '@layouts': resolve('src/layouts'),
            '@assets': resolve('src/assets'),
            '@states': resolve('src/states'),
            '@service': resolve('src/service'),
            '@utils': resolve('src/utils'),
            '@lib': resolve('src/lib'),
            '@constants': resolve('src/constants'),
            '@connections': resolve('src/connections'),
            '@abis': resolve('src/abis'),
            '@types': resolve('src/types'),
        },
        extensions: ['.js', '.ts', '.tsx', '.jsx', '.css'],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
            chunkFilename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
            ignoreOrder: false,
        }),
        new ThemedProgressPlugin(),
    ]
};
module.exports = merge(webpackBaseConfig, _mergeConfig);