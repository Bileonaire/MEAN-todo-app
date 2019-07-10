var webpack = require('webpack'),
	path = require('path');

module.exports = {
	context: __dirname + '/app',
	entry: {
		app: './app.js',
		vendor: ['angular'],
	},
	output: {
		path: __dirname + '/public/scripts',
		filename: 'todo.bundle.js',
	},
	mode: 'production',
	optimization: {
		runtimeChunk: 'single', // enable "runtime" chunk
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
                    chunks: 'all',
				},
			},
		},
	},
};
