const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isProduction ? '[name].[contenthash].js' : '[name].js',
            clean: true,
        },
        resolve: {
            extensions: ['.ts', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src')
            }
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                // 设置less文件的处理规则
                {
                    test: /\.less$/i,
                    use: [
                        'style-loader', // 将CSS注入到DOM中
                        'css-loader',   // 解析CSS文件
                        {
                            loader: 'postcss-loader', // 使用PostCSS进行处理
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "postcss-preset-env", // 使用预设环境插件
                                            {
                                                browsers: 'last 2 versions' // 兼容最新的两个版本浏览器
                                            }
                                        ]
                                    ]
                                }
                            }
                        },
                        'less-loader',   // 将Less编译为CSS
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                title: 'TypeScript Snake Game',
            }),
        ],
        devServer: {
            static: './dist',
            hot: true,
            port: 3000,
            open: true,
        },
        devtool: isProduction ? 'source-map' : 'inline-source-map'
    };
};