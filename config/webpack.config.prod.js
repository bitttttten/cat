const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const loaders = require('./loaders.js');

module.exports = {
  bail: true,
  target: 'web',
  entry: './app/index.js',
  output: {
    path: './public/',
    filename: 'hello.[chunkhash:8].js',
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './template/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        useShortDoctype: false,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    }),
  ],
};
