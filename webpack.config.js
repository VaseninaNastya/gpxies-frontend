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
    loadTrackPage:'./src/js/LoadTrackPage.js',
    userPage:'./src/js/UserPage.js',
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
    filename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'registrationPage.html',
      template: './src/templates/page.html',
      chunks: ['registrationPage']
    }),
    new HtmlWebpackPlugin({
      filename: 'loginPage.html',
      template: './src/templates/page.html',
      chunks: ['loginPage']
    }),
    new HtmlWebpackPlugin({
      filename: 'showTrack.html',
      template: './src/templates/page.html',
      chunks: ['showTrackPage']
    }),
    new HtmlWebpackPlugin({
      filename: 'trackListPage.html',
      template: './src/templates/page.html',
      chunks: ['trackListPage']
    }),
    new HtmlWebpackPlugin({
      filename: 'loadTrackPage.html',
      template: './src/templates/page.html',
      chunks: ['loadTrackPage']
    }),
    new HtmlWebpackPlugin({
      filename: 'userPage.html',
      template: './src/templates/userPage.html',
      chunks: ['userPage']
    }),
  ],
  mode: 'development'
}