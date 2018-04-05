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
            title: 'Interview',
            template: 'src/index.html'
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
