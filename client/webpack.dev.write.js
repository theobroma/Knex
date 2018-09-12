const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.common.js');

// the path(s) that should be cleaned
let pathsToClean = ['dist/*.js', 'dist/*.map'];

// the clean options to use
let cleanOptions = {
  verbose: true,
  dry: false,
  beforeEmit: true
};

const config = {};

config.mode = 'development';

config.devServer = {
  contentBase: './src/public',
  historyApiFallback: true,
  open: true,
  overlay: true,
  stats: 'minimal'
};

//config.devtool = 'cheap-module-eval-source-map';
config.devtool = 'source-map';

config.plugins = [
  new CleanWebpackPlugin(pathsToClean, cleanOptions),
  // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  }),
  // new webpack.DllReferencePlugin({
  //   context: __dirname,
  //   manifest: require('./dist/vendor-manifest.json')
  // }),
  // new AddAssetHtmlPlugin({
  //   filepath: path.resolve(__dirname, './dist/*.dll.js')
  // }),
  new WriteFilePlugin()
  //new BundleAnalyzerPlugin()
];

module.exports = merge(common, config);
