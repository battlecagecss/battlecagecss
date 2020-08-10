const webpack = require("webpack");
const path = require("path");

const entry = ["./client/index.js"];

const output = {
  path: path.resolve(__dirname, "dist"),
  publicPath: "/dist/",
  filename: "bundle.js",
};

module.exports = {
  entry,
  output,
  devtool: "eval-source-map",
  mode: 'development',
  module: {
    loaders: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react", "stage-2"],
        },
      },
    ],
  },
};
