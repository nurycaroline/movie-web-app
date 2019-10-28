const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CompressionPlugin = require('compression-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const prodMode = process.env.NODE_ENV === 'production';

const configs = prodMode
  ? require(`${__dirname}/src/config/configProd`)
  : require(`${__dirname}/src/config/configDev`);

const config = {
  entry: [
    '@babel/polyfill',
    'react-hot-loader/patch',
    './src/index.js',
  ],
  devtool: !prodMode ? 'source-map' : '',
  output: {
    publicPath: '',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  optimization: {
    sideEffects: false,
    usedExports: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.(config)$/, loader: 'file-loader?name=[name].[ext]' },
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        loader: 'file-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'assets/img/[name].[hash:8].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      {
        from: './src/pwabuilder-sw.js',
        to: './',
      },
      { from: './src/web.config', to: './' },
    ]),
    new ProgressBarPlugin(),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     APP: JSON.stringify(process.env.APP),
    //   },
    // }),
    new CompressionPlugin({
      test: /\.js/,
      algorithm: 'gzip',
    }),
    new WebpackPwaManifest({
      name: configs.TITLE,
      display: 'standalone',
      short_name: configs.SHORT_NAME,
      filename: 'manifest.json',
      description: configs.DESCRIPTION,
      theme_color: '#cb3332',
      background_color: '#ffffff',
      orientation: 'portrait',
      lang: 'pt-BR',
      start_url: 'index.html',
      icons: [
        {
          src: `${__dirname}/src/assets/img/${configs.LOGO}`,
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
        },
        {
          src: `${__dirname}/src/assets/img/${configs.LOGO}`,
          size: 1024,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      favicon: `${__dirname}/src/assets/img/${configs.LOGO}`,
      template: './public/index.html',
      filename: 'index.html',
      title: configs.TITLE,
      inject: 'body',
      minify: {
        collapseWhitespace: true,
      },
      meta: {
        'og:image': `${__dirname}/src/assets/img/${configs.LOGO}`,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: './build',
    hot: true,
    open: true,
    clientLogLevel: 'warning',
    stats: 'minimal',
    inline: true,
    overlay: true,
    historyApiFallback: true,
    headers: {
      'X-Custom-Header': 'yes',
      'X-Powered-By': 'Fq',
    },
  },
};

module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new CleanWebpackPlugin(['build']),
    new OptimizeCSSAssets(), // call the css optimizer (minification)
  );
}
