
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/vue-hellonote/'
        : '/',
    lintOnSave: false,
    devServer: {
        https: true
    },
    pluginOptions: {
        pwa: {
            iconPaths: {
                favicon32: './favicon.ico',
                favicon16: './favicon.ico',
                appleTouchIcon: './favicon.ico',
                maskIcon: './favicon.ico',
                msTileImage: './favicon.ico'
            }
        },
    }
}
