
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// devServer.publicPath 和 output.publicPath 一样被推荐
const config = {
    mode:'development',
    // source-map会生成一份用于地位的xxx.js.map文件, inline-source-map不会
    devtool: 'inline-source-map',
    stats: {
        colors: true,
        version: true,
    },
    output: {
        filename: '[name].[chunkhash].js',
        chunkFilename: 'chunk.[id].v1.0.js',
        path: path.resolve(__dirname,'./src/dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'React-router 4 && webpack4.0+',
            template: './src/html/index.ejs', // html模板文档地址，webpack默认模板为ejs
            filename: 'index.html', // 由模板生成的文件名和存放位置，可带路径的？需要去官网文档看下
            author: 'tomy',
            inject: 'true', // 资源文件注入位置true,body,header,false
            // 动态引入dll
            // vendor: /*manifest.name*/'vendor.dll.'+dllchunkname + '.js' //manifest就是dll生成的json
        }),
    ],
    module:{
        rules:[
            {
                // 需要检查打包的各种js资源文件
                test: /(\.jsx|\.js|\.es6)$/,
                // 排除查找模块的目录
                use: {
                    loader: 'babel-loader',
                    options: {
                        // 编译规则，如果不开启，编译jsx会报错，旧配置presets: ['es2015', 'react']
                        presets: ['@babel/preset-react'],
                        // plugins: ['syntax-dynamic-import'],
                        // plugins: ['@babel/plugin-transform-runtime']
                    }
                },
            },
            {
                test: /\.css$/,
                // use: [
                //     'style-loader',
                //     'css-loader'
                // ]
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader?modules' },
                ]
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
        ],
    },
}

module.exports = merge(common,config);



