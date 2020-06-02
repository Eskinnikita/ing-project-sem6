module.exports = {
    pluginOptions: {
        'style-resources-loader': {
            preProcessor: 'scss',
            patterns: [
                './src/scss/_variables.scss',
                './src/scss/_mixins.scss'
            ]
        }
    }
}
