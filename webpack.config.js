var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    // entry: ['babel-polyfill', './src/main.js'],
    entry: {
        app: './src/main.js',
        // login: './src/login.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/', // 在页面中访问所需的 URL 前缀地址,也就是所谓的容器路径
        filename: '[name].[hash].build.js'
    },
    devServer: {
        // 静态文件监控地址, 用于自动编译
        // contentBase: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。
        overlay: true,
        // compress: true, // 是否启用压缩
        // 默认端口是 8080
        // port: 9000,
        // 默认运行时打开浏览器
        // open: true,
        // 首页索引文件
        index: 'index.html',
        // 启用热替换功能
        // hot: true,
        // after、before 回调
        after: function (app) {
            // 做些有趣的事
        }
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Output Management',
            template: path.resolve(__dirname, './src/layout/base.html'), // 指定模板文件
            filename: 'index.html', // 默认为 index.html
            chunks: ["app"], // 用于指定加载哪个入口
            hash: true, // 为静态资源生成hash值
            // minify: true, // 默认是生产模式为 true，否则为 false
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    name:'[name].[ext]',
                    outputPath:'assets' //the icons will be stored in dist/assets folder
                }
            },
        ]

    }
};


if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"production"'
        }
      }),
      new webpack.optimize.UglifyJsPlugin(),
    ])
  }
  