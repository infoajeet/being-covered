const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/[name].js', // Place JavaScript files in the "js" folder
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'images/[name][ext]', // Place image assets in the "images" folder
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader'], // Process HTML files
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extract CSS into a separate file
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|webp)$/i,
                type: 'asset/resource', // Emit image files
                generator: {
                    filename: 'images/[name][ext]', // Specify the folder for image assets
                },
            },
            {
                test: /\.hbs$/, // Add Handlebars template support
                use: [
                    {
                        loader: 'handlebars-loader',
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.hbs', // Use a Handlebars template as the HTML entry point
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css', // Place CSS files in the "css" folder
        }),
    ],
    devServer: {
        static: './dist',
        open: true,
        port: 8080,
    },
    mode: 'development',
};
