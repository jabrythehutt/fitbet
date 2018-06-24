const slsw =  require('serverless-webpack');
const path = require("path");
module.exports = {
  entry: slsw.lib.entries,
  // entry: "./lambda/contract-service.ts",
  target: 'node',
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        use: 'ts-loader'
      }
    ]
  },
  externals: [
    /aws-sdk/
  ],
  devtool: 'source-map',
  mode: 'production'
};
