module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:80',// 后端接口
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}


