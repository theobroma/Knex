const path = require('path');
const webpack = require('webpack');

const outputPath = path.join(__dirname, 'dist');

module.exports = {
  mode: 'development',
  context: process.cwd(),
  entry: {
    vendor: [
      'axios',
      'classnames',
      'lodash',
      'react',
      'react-dom',
      'react-redux',
      'redux',
      'redux-thunk',
      'semantic-ui-react',
      'uuid',
      'validatorjs'
    ]
  },
  output: {
    path: outputPath,
    filename: '[name].[hash:4].dll.js',
    library: '[name]_[hash]'
  },
  devtool: 'source-map',
  optimization: {
    minimize: false
  },
  performance: {
    hints: false
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(outputPath, '[name]-manifest.json'),
      name: '[name]_[hash]'
    })
  ]
};
