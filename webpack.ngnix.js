
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// devServer.publicPath 和 output.publicPath 一样被推荐
const config = {
    mode:'development',
    devtool: 'source-map',
    output: {
        filename: '[name].v1.0.js',
        chunkFilename: 'chunk.[id].v1.0.js',
    },
    devServer: {
        // 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
        // devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。
        contentBase: path.resolve(__dirname,'./src/html/'),
        // hot: true,
        // 是否开启访问本地ip
        host:'0.0.0.0',
        port: 8090,
        // This option lets the browser open with your local IP.  cli mode: webpack-dev-server --useLocalIp
        useLocalIp: true,
        // Tell the server to watch the files served by the devServer.contentBase option. File changes will trigger a full page reload.
        watchContentBase: true,

        // // 当启用 lazy 时，dev-server 只有在请求时才编译包(bundle)。
        // // 这意味着 webpack 不会监视任何文件改动。我们称之为“惰性模式”
        // // watchOptions 在使用惰性模式时无效。
        // lazy: false,
        // // 启用 noInfo 后，诸如「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
        // noInfo: true,
        // // When open is enabled, the dev server will open the browser.
        // open: true,
        // // Specify a page to navigate to when opening the browser.
        // // openPage:  '/different/page',
        // // 当存在编译器错误或警告时，在浏览器中显示全屏覆盖。默认false,不开启
        // // Shows a full-screen overlay in the browser when there are compiler errors or warnings. Disabled by default. If you want to show only compiler errors:
        // overlay: false,
        // // 此选项可让你精确控制打包信息。 如果你只想要一些打包bundle信息，但不是全部，这可能是一个很好的中间地带。
        // // 详细配置https://www.webpackjs.com/configuration/stats/
        // stats: '',// 与quiet或noInfo一起使用时，此选项无效。
        //
        // // 与监视文件相关的控制选项。
        // // webpack 使用文件系统(file system)获取文件改动的通知。在某些情况下，不会正常工作。例如，当使用 Network File System (NFS) 时。
        // // Vagrant 也有很多问题。在这些情况下，请使用轮询：
        // watchOptions:{
        //     poll: true
        // }
        // // 如果这对文件系统来说太重了的话，你可以修改间隔时间（以毫秒为单位），将其设置为一个整数。
        // // 详细配置https://www.webpackjs.com/configuration/watch/
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
                    // https://github.com/babel/babel/issues/8655 package.json中配置
                    // options: {
                    // //     // 编译规则，如果不开启，编译jsx会报错，旧配置presets: ['es2015', 'react']
                    // //  presets: ['@babel/preset-react',],
                    //
                    // },
                    // options: {
                    //     presets: ['@babel/preset-env'],
                    // }
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




// `
// devServer.contentBase: boolean|string|array
// 告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要。
// devServer.publicPath 将用于确定应该从哪里提供 bundle，并且此选项优先。
//
// // 默认情况下，将使用当前工作目录作为提供内容的目录，但是你可以修改为其他目录
// contentBase: path.join(__dirname, "public")
//
// // 从多个目录提供内容
// contentBase: [path.join(__dirname, "public"), path.join(__dirname, "assets")]
//
// // 禁用 contentBase
// contentBase: false
//
// // Usage via the CLI
// webpack-dev-server --content-base /path/to/content/dir
//
//
// `
//
//
// `
// host: "0.0.0.0"
//
//
// `

