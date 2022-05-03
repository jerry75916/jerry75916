const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/js/controller.js',
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: './',
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
  devtool: 'source-map',
  devServer: {
    // contentBase: path.join(__dirname, "dist"),
    port: 8081,
    host: '0.0.0.0',
    headers: {
      'X-foo': '112233',
    },
    // hot: true,
    inline: true,
    open: true,
    overlay: true,
    stats: 'errors-only',
  },
  module: {
    //通常是用來引入css
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'src/img/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({ filename: 'main.[hash].css' }),
  ],
};
