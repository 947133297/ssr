module.exports = {
    output: {
        path: __dirname + "/../dist",
        filename: "[name].bundle.js",
        publicPath:"/dist/"
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015"],
                        plugins: ["syntax-dynamic-import"]
                    }
                },
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".js",".vue",".json"],
        alias: {
            'vue$': 'vue/dist/vue.js',
        }
    }
};
