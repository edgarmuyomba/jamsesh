const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    "mode": "production",
    "entry": "./src/index.js",
    "output": {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/template.html'
        }
        )
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.html$/i,
                loader: "html-loader"
            },
            {
                test: /\.(png|jpg|gif|jpeg|svg|mp3)$/i,
                type: 'asset/resource'
            },
        ]
    },
    devtool: "eval-source-map",
    devServer: {
        watchFiles: ['./src/template.html']
    }
}