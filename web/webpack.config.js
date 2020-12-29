// @ts-check

const HtmlWebpackPlugin = require("html-webpack-plugin");
const dotenv = require("dotenv");
const path = require("path");
const webpack = require("webpack");

module.exports = (_, argv) => ({
  entry: "./src/index",

  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].[contenthash:8].js",
    publicPath: "/",
  },

  devServer: {
    historyApiFallback: true,
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(
        dotenv.config({ path: `.env.${argv.mode}` }).parsed
      ),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
});
