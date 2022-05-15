const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

const outputDirectory = "dist";
const serverURL = "http://localhost:3000";
const webpackDevServerPort = 9000;

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-eval-source-map", // build: slow, rebuild: faster, quality: original source
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, outputDirectory),
  },
  devServer: {
    host: "0.0.0.0",
    contentBase: path.join(__dirname, outputDirectory),
    port: webpackDevServerPort,
    hot: true,
    open: true,
    proxy: {
      "/api": serverURL,
    },
  },
});
