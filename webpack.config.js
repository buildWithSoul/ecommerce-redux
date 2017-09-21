const path = require('path');

const webpack = require('webpack');

module.exports = {
	entry: './src/client.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	watch: true,
	module:{
		loaders: [
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['react', 'env', 'stage-1']
				}
			}
		]
	},
	node: {
   		fs: "empty"
	}

}