/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: {
    // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
    ...options.output
  }, // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery
        }
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: options.tsLoaders
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        // test: /\.css$/,
        // exclude: /node_modules/,
        // use: ['style-loader', 'css-loader'],
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-modules-typescript-loader' }, // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" means to load the module "./styles.scss.d.td")
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: 'pv-[local]'
              },
              localsConvention: 'camelCase'
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.s[ac]ss$/i,
        include: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'file-loader',
        type: 'javascript/auto'
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }
      }
    ]
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.EnvironmentPlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      API_URL: JSON.stringify(process.env.API_URL),
      PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL)
    }),
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })
  ]),
  resolve: {
    modules: ['node_modules', 'app'],
    extensions: ['.js', '.jsx', '.react.js', '.ts', '.tsx'],
    mainFields: ['browser', 'jsnext:main', 'main']
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {}
});
