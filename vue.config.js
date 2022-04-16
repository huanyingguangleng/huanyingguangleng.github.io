const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': { // 匹配所有以 '/api'开头的请求路径
                target: 'http://api.tianapi.com', // 代理目标的基础路径
                changeOrigin: true,
                pathRewrite: { '^/api': '' }
            },
            '/autumnfish': { // 匹配所有以 '/autumnfish'开头的请求路径
                target: 'https://autumnfish.cn', // 代理目标的基础路径
                changeOrigin: true,
                pathRewrite: { '^/autumnfish': '' }
            }
        }
    },
})