const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src/main.ts'),
  output: {
    filename: 'dist/bundle.js',
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  }
};
