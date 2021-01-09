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
      filename:'showTrackPage.html',
      template:'./src/showTrackPage.html'
    }),
    new HtmlWebpackPlugin({
      filename:'registrationPage.html',
      template:'./src/registrationPage.html'
    }),
  ],
  mode: 'development'
}