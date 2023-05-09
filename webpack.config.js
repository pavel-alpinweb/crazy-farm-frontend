const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/main.ts",
  devtool: "inline-source-map",
  plugins: [
    new CopyPlugin({
      patterns: [
          {
            from: path.resolve(__dirname, "src/assets/**/*"),
            to: path.resolve(__dirname, "public/assets" ),
          }
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
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
