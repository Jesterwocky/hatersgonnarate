const path = require('path');

module.exports = {
  context: path.resolve(__dirname),
  entry: './src/index.js',
  output: {
    path: 'app',
    filename: 'bundle.js',
  },
  module: {
    use: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
