const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'development',
  devtool: 'source-map',

  output: {
    path: path.join(__dirname, 'dist/'),
  },

  resolve: {
    alias: {
      // aliases used in templates
      '@fonts': path.resolve(__dirname, 'src/fonts'),
      '@favicons': path.resolve(__dirname, 'src/favicon'),
      '@images': path.resolve(__dirname, 'src/img'),
      '@icons': path.resolve(__dirname, 'src/icons'),
      '@duotone-icons': path.resolve(__dirname, 'src/icons/duotone-icons'),
      '@scripts': path.resolve(__dirname, 'src/js'),
      '@styles': path.resolve(__dirname, 'src/scss'),
    },
  },

  plugins: [
    new HtmlBundlerPlugin({
      // automatically detect all pages
      entry: 'src/html',
      // define pages manually, use it for developing/debugging single pages
      // entry: {
      //   index: './src/html/index.html',
      //   'docs/index': './src/html/docs/index.html',
      // },
      js: {
        filename: 'assets/js/[name].[contenthash:8].js',
      },
      css: {
        filename: 'assets/css/[name].[contenthash:8].css',
      },
      preprocessor: 'handlebars',
      preprocessorOptions: {
        partials: [
          './src/partials',
        ],
        helpers: {
          is: function (v1, v2, options) {
            const variants = v2.split(' || ');
            const isTrue = variants.some((variant) => v1 === variant);

            return isTrue ? options.fn(this) : options.inverse(this);
          },
          isnt: function (v1, v2, options) {
            return v1 !== v2 ? options.fn(this) : options.inverse(this);
          },
        },
      },
      data: {
        webRoot: '',
      },
      loaderOptions: {
        sources: [
          // enable resolving in the custom attributes of the `a` tag
          {
            tag: 'a',
            attributes: ['data-bigpicture'],
          },
          // enable resolving url() value in the style attribute of the `div` tag
          {
            tag: 'div',
            attributes: ['style'],
          },
          {
            tag: 'section',
            attributes: ['style'],
          },
        ],
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              import: false, // disable @import at-rules handling
            },
          },
          // enable autoprefixer if you need it
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     postcssOptions: {
          //       plugins: [
          //         autoprefixer,
          //       ],
          //     },
          //   },
          // },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(ico|png|jp?g|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(svg)$/,
        oneOf: [
          // the svg patterns used as background-image in the style attribute must be saved into file
          {
            test: /patterns/,
            type: 'asset/resource',
            generator: {
              filename: 'assets/img/[name].[hash:8][ext]',
            },
          },
          // others svg should be inlined
          {
            type: 'asset/inline',
          }
        ],

      },
      {
        test: /[\\/]fonts|node_modules[\\/].+(woff(2)?|ttf|otf|eot|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },

    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/](node_modules)[\\/].+\.js$/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },

  devServer: {
    static: path.join(__dirname, 'dist'),
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
    client: {
      overlay: false,
    },
  },
  target: 'web',
};
