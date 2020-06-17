const webpack = require('webpack');

module.exports = {
	entry: __dirname + '/src/index.js',
	output: {
		filename: 'localstorage.min.js',
		path: __dirname + '/dist',
		libraryTarget: 'umd',
        umdNamedDefine: true
	},
	externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
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