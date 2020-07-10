module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/styles/styles.scss";`
            }
        }
    },
    devServer: {
        disableHostCheck: true
    }
}