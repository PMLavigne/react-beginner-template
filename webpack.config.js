// @flow
/* eslint-env node, es6 */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pkgJson = require('./package.json');

const outPath = path.resolve(__dirname, 'build');
const isProd = process.env.NODE_ENV === 'production';

if (!isProd) {
  pkgJson.version += '-dev';
}

module.exports = {
  context: __dirname,
  devtool: isProd ? 'source-map' : 'cheap-module-source-map',
  entry: {
    app: ['babel-polyfill', !isProd ? 'react-hot-loader/patch' : null, './src/js/app'].filter(entry => !!entry),
    style: ['./src/scss/style.scss']
  },
  output: {
    filename: 'js/[name].js',
    path: outPath,
    publicPath: '/',
    crossOriginLoading: 'anonymous',
    pathinfo: !isProd
  },
  externals: {},
  resolve: {
    alias: {
      conf: path.resolve(__dirname, 'src/conf'),
      font: path.resolve(__dirname, 'src/font'),
      img: path.resolve(__dirname, 'src/img'),
      scss: path.resolve(__dirname, 'src/scss'),
      template: path.resolve(__dirname, 'src/template'),
      _component: path.resolve(__dirname, 'src/js/component'),
      _state: path.resolve(__dirname, 'src/js/state'),
      _util: path.resolve(__dirname, 'src/js/util')
    }
  },
  devServer: {
    contentBase: outPath,
    inline: true,
    historyApiFallback: true,
    hot: true,
    stats: {
      colors: true
    },
    noInfo: true,
    open: true
  },
  stats: 'normal',
  performance: {
    hints: isProd ? 'warning' : false,
    maxAssetSize: 512 * 1024,
    maxEntrypointSize: 1024 * 1024
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: 'source-map-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          isProd
            ? MiniCssExtractPlugin.loader
            : {
                loader: 'style-loader',
                options: {}
              },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: {
          loader: 'url-loader',
          options: {
            limit: 65535,
            name: 'img/[name].[ext]'
          }
        }
      },
      {
        test: /\.svg$/,
        exclude: /font\//,
        use: {
          loader: 'file-loader',
          options: {
            name: 'img/[name].[ext]'
          }
        }
      },
      {
        test: /font\/.*\.svg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'font/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|[ot]tf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'font/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    isProd
      ? new MiniCssExtractPlugin({
          filename: 'css/[name].css',
          chunkFilename: 'css/[name]-[id].css'
        })
      : null,
    !isProd ? new webpack.HotModuleReplacementPlugin() : null,
    new webpack.DefinePlugin({
      'process.env': {
        IS_BROWSER: JSON.stringify('true'),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      title: 'Test App',
      inject: false,
      template: path.resolve(__dirname, 'src/template/index.ejs'),
      xhtml: true,
      pkg: pkgJson,
      includeJs: isProd ? ['app'] : ['style', 'app'],
      includeCss: ['style', 'app']
    })
  ].filter(entry => !!entry)
};
