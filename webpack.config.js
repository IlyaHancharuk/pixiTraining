const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
	const projectName = env.project || "p1";
	const projectAssetsPath = `projects/${projectName}/assets`;
	const commonAssetsPath = "assets";

	const patterns = [
		fs.existsSync(projectAssetsPath) && { from: projectAssetsPath, to: "assets", noErrorOnMissing: true },
		fs.existsSync(commonAssetsPath) && { from: commonAssetsPath, to: "assets", noErrorOnMissing: true },
	].filter(Boolean);

	return {
		entry: `./projects/${projectName}/index.js`,
		output: {
			path: path.resolve(__dirname, `dist/${projectName}`),
			filename: "bundle.js",
			clean: true,
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
						},
					},
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: `./projects/${projectName}/index.html`,
				filename: "index.html",
				inject: "body",
			}),
			new CopyWebpackPlugin({
				patterns,
			}),
		],
		devServer: {
			static: path.resolve(__dirname, `dist/${projectName}`),
			open: true,
			port: 5050,
		},
		mode: "development",
	};
};
