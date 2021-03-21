const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const SOURCE = './source/js/main.js';
const DIST = path.resolve(__dirname, 'build');

module.exports = {
  mode: "production",
  entry: SOURCE,
  devtool: 'source-map',
  output: {
    filename: 'js/main.bundle.js',
    path: DIST,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/leaflet.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset',
      },
    ],
  },
};
