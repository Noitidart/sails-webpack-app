const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports.webpack = {
  config: [
    {
      mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
      devtool: process.env.NODE_ENV === 'production' ? undefined : 'eval-source-map',
      entry: './assets/js/index.js',
      output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, '../.tmp/public/js'),
        publicPath: '/js/'
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: 'index.bundle.css'
        }),
        new CopyPlugin([
          {
            from: './assets',
            to: '../',
            ignore: ['js/**/*', 'styles/**/*', '.eslintrc']
          },
        ]),
      ],
      module: {
        rules: [
          { test: /\.js$/, exclude: /node_modules|dependencies/, loader: 'babel-loader' },
          { test: /\.css$/, exclude: /node_modules/, use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'] },
          { test: /\.less$/, exclude: /node_modules/, use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader', 'less-loader'] }
        ]
      }
    }
  ]
};
