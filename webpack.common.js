const path = require('path');

const config = {
    entry: {
        index: [
            'babel-polyfill',path.resolve(__dirname, './src/entry/index.jsx')
        ],
        vendors: [
            'react','react-dom','antd'
        ]
    },
    // 文件解析配置
    resolve: {
        // 默认后缀名，配置后可省略
        extensions: ['.js', '.jsx'],
            // 文件夹别名配置
        alias: {
            components: path.resolve(__dirname, './src/components'),
            // commonjsx: path.resolve(__dirname, '../src/commonjsx'),
            // common: path.resolve(__dirname, '../src/assets/common'),
            // actions: path.resolve(__dirname, '../src/redux/actions')
        }
    }
}

module.exports = config;