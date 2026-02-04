module.exports = {
    context: `${__dirname}/entries`, // || process.cwd()
    entry: {
        lib: 'lib.js',
        app: 'app.js',
        templates: 'templates.js'
    },
    output: {
        path: `${__dirname}/build`,
        filename: '[name].js'
    },
    resolve: {
        root: path.resolve(__dirname),
        extensions: ['', '.js', '.json'],

        alias: {
            '%config%': `%app%/config${ isDebug ? '-debug' : '' }.json`,
        }
    },
};
