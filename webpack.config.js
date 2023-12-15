const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./main.ts",
  devtool: "inline-source-map",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./assets/**/*",
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
    new HtmlWebpackPlugin({
      template: "../public/index.html",
      filename: "./index.html",
    }),
    new webpack.DefinePlugin({
      'process.env': {
        GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID)
      },
    }),
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.svg$/,
            type: "asset/inline",
            resourceQuery: /inline/,
          },
        ],
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
    clean: true,
  },
};
