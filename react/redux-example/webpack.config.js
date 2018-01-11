module.exports = {
    entry: {
        cln:'./entry-cln.js'
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js",
        publicPath:"/dist/"
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            }
        ]
    }
};
