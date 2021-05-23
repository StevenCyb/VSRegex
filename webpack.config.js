'use strict';

const path = require('path');

/**@type {import('webpack').Configuration}*/
const config = {
  target: 'node',
	mode: 'none',

  entry: './src/extension.ts',
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'extension.js',
    libraryTarget: 'commonjs2',
    devtoolModuleFilenameTemplate: '../[resource-path]'
  },
  devtool: 'source-map',
  externals: {
    vscode: 'commonjs vscode'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
};
module.exports = config;