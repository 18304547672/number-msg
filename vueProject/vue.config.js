module.exports = {
    devServer: {
        port: 8888,
        https: false,
        host: "localhost",
        open: true,
        proxy: {
            "/dev": {
                target: "http://localhost:7300/mock/5f9e2e85098e45456c2f75b1/menger",
                changeOrigin: true,
                pathRewrite: {
                    "^/dev":""
                }
            }

        }
    },
    lintOnSave: false
}