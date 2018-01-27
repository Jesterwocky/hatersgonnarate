const path = require('path');

module.exports = {
  context: path.resolve(__dirname),
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: 'bundle.js'
  },
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, 'app')
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: [
          path.resolve('.')
        ],
        query: {
          presets: [['react'], ['es2015']],
          plugins: ['transform-class-properties']
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};
