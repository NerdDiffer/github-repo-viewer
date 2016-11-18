const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PATHS = require('./paths');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack/hot/dev-server', // hot reloading url
    'webpack-dev-server/client?http://localhost:8080', // inline loading url
    `${PATHS.SRC}/index.jsx`,
  ],
  output: {
    path: PATHS.BUILD,
    publicPath: 'build',
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: ['node_modules'],
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new ExtractTextPlugin('styles.css'),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        loader: 'babel',
        include: PATHS.SRC,
        test: /\.jsx?/,
        query: {
          cacheDirectory: true
        }
      },
      {
        loader: ExtractTextPlugin.extract('css?inlineSourceMap'),
        include: PATHS.STYLES_DIST,
        test: /\.css$/,
      },
      {
        loader: 'file',
        include: PATHS.STYLES_DIST,
        test: /\.(eot|png|woff|woff2|svg|ttf)$/,
      }
    ]
  }
};
