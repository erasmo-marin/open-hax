var path = require('path');
var webpack = require('webpack');
var env = 'development';
env = process.env.ENVIRONMENT || env;

var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
    __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.ENVIRONMENT || env)
    }
});

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var pluginsSettings = [];

if (env == 'production') {
    console.log("Building in production mode");
    pluginsSettings = [
        new webpack.HotModuleReplacementPlugin(),
        definePlugin,
        commonsPlugin,
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
          mangle: true,
          sourcemap: false,
          compress: {
            warnings: false,
          }
        })
    ];
} else {
    console.log("Building in development mode");
    pluginsSettings = [
        new webpack.HotModuleReplacementPlugin(),
        definePlugin,
        commonsPlugin
    ];
}

module.exports = {
    cache: true,
    entry: {
        app:  './client/index.jsx'
    },
    output: {
        path: 'public/bundle',
        filename: 'app.js'
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                test: /\.jsx?$/,
                exclude: /node_modules/,
                query: {
                    plugins: ['react-hot-loader/babel'],
                    presets: ['babel-preset-es2015', 'babel-preset-react'].map(require.resolve)
                }
            },
            {
                test:/\.less$/,
                exclude:'/node_modules',
                loader:"style!css!less"
            } 
        ]
    },
    resolve: {
        extensions: ['', '.js','.jsx']
    },
    plugins: pluginsSettings
};