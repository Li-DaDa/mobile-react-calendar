const path = require('path')
const htmlPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        app: path.join(__dirname, 'index.jsx')
    },
    output:{
        filename: 'boundle.js',
        path: path.join(__dirname, 'dist')
    },
    devServer: {
        hot: true,
        host: '0.0.0.0',
        port: 3000,
        overlay: true
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: path.join(__dirname, 'node_modules'),
                use: ['babel-loader']
            }, {
                test: /\.css$/,
                exclude: path.join(__dirname, 'node_modules'),
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new htmlPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'index.html')
        })
    ]
}