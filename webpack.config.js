// var HtmlWebpackPlugin = require('html-webpack-plugin');
// const path = require('path')

// module.exports = {
//   entry: './src/js/index.js',
//   module: {
//     rules: [
//       { test: /\.css$/, use: ['style-loader', 'css-loader'] },
//       { test: /\.(js)$/, use: 'babel-loader' },
//       {
//         test: /\.(jpe?g|png|svg|ico|gif)$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               outputPath: 'img',
//               name: '[name].[ext]'
//             }
//           }
//         ]
//       },
//     ]
//   },
//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     filename: 'index_bundle.js'
//   },
//   plugins: [
//     new HtmlWebpackPlugin({}),
//     new HtmlWebpackPlugin({
//       filename:'showTrack.html',
//       template:'./src/showTrack.html'
//     }),
//   ],
//   mode: 'development'
// }

var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')

module.exports = {
  entry: {
    showTrackPage: './src/js/ShowTrackPage.js',
    registrationPage: './src/js/RegistrationPage.js',
    loginPage: './src/js/LoginPage.js',
    trackListPage: './src/js/TrackListPage.js',
    loadTrackPage:'./src/js/LoadTrackPage.js'
  },
  module: {
    rules: [
      // { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.css$/, use: ['style-loader', 'css-loader']
      },
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
    filename: 'js/[name].bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'registrationPage.html',
      template: './src/registrationPage.html',
      chunks: ['registrationPage']
    }),
    new HtmlWebpackPlugin({
      filename: 'loginPage.html',
      template: './src/loginPage.html',
      chunks: ['loginPage']
    }),
    new HtmlWebpackPlugin({
      filename: 'showTrack.html',
      template: './src/showTrackPage.html',
      chunks: ['showTrackPage']
    }),
    new HtmlWebpackPlugin({
      filename: 'trackListPage.html',
      template: './src/trackListPage.html',
      chunks: ['trackListPage']
    }),
    new HtmlWebpackPlugin({
      filename: 'loadTrackPage.html',
      template: './src/loadTrackPage.html',
      chunks: ['loadTrackPage']
    }),
  ],
  mode: 'development'
}