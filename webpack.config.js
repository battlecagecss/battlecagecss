const webpack = require('webpack');
const path = require('path');

const entry = [ './client/index.js' ];

const output = {
	path: path.resolve(__dirname, 'dist'),
	publicPath: '/dist/',
	filename: 'bundle.js'
};

module.exports = {
	entry,
	output,
	devtool: 'eval-source-map',
	// mode: 'development',
	module: {
		rules: [
			{
				test: /.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};
