const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const webpack = require('webpack')
module.exports = {
    output: {
        path: __dirname + "./../dist",
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
                        presets: ["es2015"]
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
    },
    entry: './src/entry-client.js',
    plugins: [
        new VueSSRClientPlugin(),
        new webpack.DefinePlugin({
            'process.env.VUE_ENV': '"'+process.env.VUE_ENV+'"'
        })
    ]
};
