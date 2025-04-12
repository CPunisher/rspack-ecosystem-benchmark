module.exports = {
	mode: "development",
	devtools: false,
	entry: "./src/index.jsx",
	resolve: {
		extensions: [".js", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.jsx$/,
				use: {
					loader: "builtin:swc-loader",
					options: {
						jsc: {
							parser: {
								syntax: "ecmascript",
								jsx: true
							}
						}
					}
				}
			}
		]
	}
};
