const webpack = require('webpack');

module.exports = {
	entry: './client/app.js',
	output: {
	path: './public/bundle',
	filename: 'app.bundle.js'
	},
	module: {
		loaders: [{
			 test: /\.js$/,
			 exclude: /node_modules/,
			 loader: 'babel-loader'
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
			    warnings: false,
			},
			output: {
			    comments: false,
			},
		})
	]
};