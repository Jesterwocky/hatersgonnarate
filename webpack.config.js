const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname),
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'app'),
    filename: 'bundle.js',
    publicPath: 'app/',
  },
  watch: true,
  devServer: {
    contentBase: path.resolve(__dirname),
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015'],
              plugins: ['transform-class-properties'],
            },
          },
        ],
        include: [
          path.resolve(__dirname, 'src'),
        ],
      },
      {
        test: /\css?$/,
        loader: 'style!css-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  stats: {
    colors: true,
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};
