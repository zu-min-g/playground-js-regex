"use strict"
var path = require("path")
var webpack = require("webpack")
var packageJson = require("./package.json")
var env = process.env.NODE_ENV || "development"
let config = {
  mode: env,
  entry: {
    pattern: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist/browser"),
    filename: "[name].js",
    library: "pattern",
    libraryTarget: "var",
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".webpack.js", ".web.js", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: ["babel-loader"],
        exclude: path.resolve(__dirname, "vendor"),
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(env),
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.BannerPlugin({
      banner: `pattern.js | v${packageJson.version} | MIT License`,
    }),
  ],
  optimization: {
    minimize: false,
  },
}

if (env === "production") {
  config.output.filename = "[name].min.js"
  config.optimization.minimize = true
} else {
  config.devtool = "inline-source-map"
}

module.exports = config
