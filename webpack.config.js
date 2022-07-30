const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    // Multiple entries.
    entry: {
        background: './src/background.js',
        popup: {
            import: './src/popup/popup.js',
            filename: 'popup/[name].js', // Customize the path in output folder.
        },
        options: {
            import: './src/options/options.js',
            filename: 'options/[name].js', // Customize the path in output folder.
        },
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        clean: true,
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/manifest.json' },
                { from: './**/*.html', context: './src' },
                { from: './**/*.css', context: './src' },
            ],
        }),
    ],
    optimization: {
        minimizer: [
            '...', // Use the existing minimizers (`terser-webpack-plugin`).
            new HtmlMinimizerPlugin(),
            new CssMinimizerPlugin(),
        ],
    },
    devtool: 'cheap-module-source-map',
};
