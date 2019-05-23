/**
 * webpack config for the react app.
 * @author gaurav
 */
const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'src/client/build');
const APP_DIR = path.resolve(__dirname, 'src/client/app');

dotenv.config();
// const env = dotenv.config().parsed;
// const envKeys = Object.keys(env).map((prev, next) => {
// 	prev[`process.env.${next}`] = JSON.stringify(env[next]);
// 	return prev;
// }, {});

const config = {
	entry: `${APP_DIR}/index.js`,
	output: {
		path: BUILD_DIR,
		filename: '[name].bundle.js',
	},

	devServer: {
		contentBase: './src/client/build',
	},

	module: {
		rules: [
			{
				test: /\.jsx?/,
				include: APP_DIR,
				loader: 'babel-loader',
			},
			{
				test: /\.(sass|scss)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
				}),
			},
			{
				test: /\.css?/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(jpe?g|png|gif|svg|ico)$/i,
				loaders: [
					'file-loader?hash=sha512&digest=hex&name=assets/images/[hash].[ext]',
					{
						loader: 'image-webpack-loader',
						query: {
							mozjpeg: {
								progressive: true,
							},
							gifsicle: {
								interlanced: false,
							},
							optipng: {
								optimizationLevel: 4,
							},
							pngquant: {
								quality: '75-90',
								speed: 3,
							},
						},
					},
				],
				exclude: '/node_modules/',
				include: APP_DIR,
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({ template: './src/client/app/index.html' }),
		new ExtractTextPlugin('[name].css'),
		new webpack.DefinePlugin({
			'process.env': {
				URL: JSON.stringify(process.env.URL || process.env.URL_DEVELOPMENT),
			},
		}),
	],
};

module.exports = config;
