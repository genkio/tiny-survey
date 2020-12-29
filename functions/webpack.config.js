// @ts-check

const path = require("path");
const GeneratePackageJsonPlugin = require("generate-package-json-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const basePackage = {
  engines: {
    node: "12",
  },
  main: "./index.js",
  name: "tiny-survey-functions",
  private: true,
  version: "0.1.0",
};

module.exports = () => ({
  entry: "./src/index.ts",

  externals: [/^firebase.+$/, /^@google.+$/],

  devtool: "inline-source-map",

  mode: "production",

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: "commonjs",
  },

  plugins: [
    new CleanWebpackPlugin(),
    new GeneratePackageJsonPlugin(basePackage),
  ],

  resolve: {
    extensions: [".ts", ".js"],
  },

  target: "node",
});
