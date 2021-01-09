var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
  entry: './src/js/index.js',
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(js)$/, use: 'babel-loader' },
      {
        test: /\.(jpe?g|png|svg|ico|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'img',
              name: '[name].[ext]'
            }
          }
        ]
      },
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({}),
    new HtmlWebpackPlugin({
      filename:'showTrack.html',
      template:'./src/showTrack.html'
    }),
  ],
  mode: 'development'
}