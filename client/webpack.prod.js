const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.js');

const config = {};

config.mode = 'production';

config.devtool = 'none';
//turn off minimize and UglifyJSPlugin to see pretty output bundle
config.optimization = {
  minimize: true
};

config.module = {
  rules: [
    {
      test: /\.(sass|scss)$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          { loader: 'css-loader' },
          //use minimize or OptimizeCSSAssets
          //{ loader: 'css-loader', options: { minimize: true } },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' }
        ]
      })
    }
  ]
};

config.plugins = [
  // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
  // inside your code for any environment checks; UglifyJS will automatically
  // drop any unreachable code.
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  }),
  // new webpack.DllReferencePlugin({
  //   context: '.',
  //   manifest: require('./dist/vendor-manifest.json')
  // }),
  // new AddAssetHtmlPlugin({
  //   filepath: path.resolve(__dirname, './dist/*.dll.js')
  // }),
  new UglifyJSPlugin({
    cache: true,
    parallel: true,
    uglifyOptions: {
      output: {
        comments: false,
        beautify: false
      },
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    }
  }),
  new ExtractTextPlugin({ filename: 'css/[name].css' }),
  new OptimizeCSSAssets()
];

module.exports = merge(common, config);
