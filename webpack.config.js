const webpack = require('webpack');

module.exports = {
	entry: __dirname + '/src/index.js',
	output: {
		filename: 'vue-localstorage.min.js',
		path: __dirname + '/dist'
	},
	module:{
		rules:[
			{
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
		]
	},
	plugins:[
		new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
	]
}