const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Main entry point of the source code
    entry: {
        app: './src/index.js'
    },
    module: {
        rules: [
            // Loads the html as string and parses the content
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
            },
            // Loads image files from js, css
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            // Loads other file types from js, css
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        'es2015',
                        'stage-0',
                    ]
                }
            }
        ]
    },
    plugins: [
        // Plugin to use the index.html as our base template
        new HtmlWebpackPlugin({
            title: 'basic-webpack',
            template: 'src/index.html',

            // 這個的效果是：把 script 放在 <head> 上
            // 否則，預設 <script> 會被放在 <body> 的最後面，也就是 browser 把 HTML load 完以後才載入執行 js

            // 然而，因為 css file 是在 script 中 import 的
            // 因此，在每次打包過程中，都必須執行到 script，webpack 才會把該 css file 打包載入，
            // 所以才會造成「在 dev mode 下，每次 refresh 都會先看到光禿禿的 HTML 頁面，接著才有 css 渲染」
            
            // 而在 prod mode 下，因為產出的就已經是編譯好的靜態 html 檔案，
            // 不論是 css 或是 script 都已經打包完成並且 inject 至 inedx.html 中，
            // 所以，serve 這樣已經產生好的 index.html，當然會立即看到渲染好的畫面，而不會像 dev mode 下，每次都會先看到光禿禿畫面。

            // 當然，也是有解決 dev mode 下「會先看到光禿禿畫面」的辦法：
            // 將 script 放到 head 中，及早將 css 打包載入，
            // 此舉也確保「當 script 可執行時，在它之前的 css link 都是可用的了」
            // 也就是說，在 browser parse HTML 的階段完成時，就已經受到 css 渲染完畢，
            inject: 'head'
        })
    ],
    // Output directory
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.scss', '.css'],
    }
};
