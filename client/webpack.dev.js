const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const config = {};

config.mode = 'development';

config.devtool = 'cheap-module-eval-source-map';
//config.devtool = 'source-map';

config.module = {
  rules: [
    {
      test: /\.(sass|scss)$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    }
  ]
};

config.plugins = [
  // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  }),
  new webpack.HotModuleReplacementPlugin()
];

config.devServer = {
  contentBase: './src/public',
  historyApiFallback: true,
  open: true,
  overlay: true,
  stats: 'minimal',
  hot: true,
  // Don't refresh if hot loading fails. Good while
  // implementing the client interface.
  hotOnly: true
};

module.exports = merge(common, config);
