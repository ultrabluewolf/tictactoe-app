const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const bundleExtractPlugin = new ExtractTextPlugin({
  filename: 'bundle.css',
});

module.exports = {
  entry: './js/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['es2015'],
            },
          },
        ],
      },
      {
        test: /.scss$/,
        exclude: [/node_modules/],
        use: bundleExtractPlugin.extract({
          use: ['css-loader', 'sass-loader'],
        }),
      },
    ],
  },

  stats: {
    colors: true,
  },

  devtool: 'source-map',

  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },

  plugins: [
    bundleExtractPlugin,
  ]
};
