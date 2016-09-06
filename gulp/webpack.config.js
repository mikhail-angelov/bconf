var webpack = require('webpack');
 
module.exports = {
  entry: './ui/index',
  output: {
    path: __dirname + '/ui/dist',
    filename: 'bundle.js',
    publicPath: 'http://0.0.0.0:8080/ui/dist/'
  },
  plugins: [
    new webpack.ProvidePlugin({
      riot: 'riot'
    })
  ],
  module: {
    preLoaders: [
      { test: /\.tag$/, exclude: /node_modules/, loader: 'riotjs-loader', query: { type: 'none' } }
    ],
    loaders: [
      { test: /\.js$|\.tag$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  devServer: {
    contentBase: './ui'
  }
};