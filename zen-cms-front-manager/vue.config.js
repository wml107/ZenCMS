module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://118.193.47.219:8080',// 后端接口
                changeOrigin: true, // 是否跨域
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}


