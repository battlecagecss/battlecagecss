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
	// devServer: {
	//   publicPath: 'http://localhost:8080/build/',
	//   proxy: {
	//     '/api': {
	//       target: 'http://localhost:3000/'
	//     }
	//   },
	//   hot: true,'
	// },
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
