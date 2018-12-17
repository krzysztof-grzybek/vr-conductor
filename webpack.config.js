const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: process.env.NODE_ENV,
  devServer: {
    contentBase: __dirname,
    publicPath: '/dist',
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
};
