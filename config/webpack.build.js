const path = require("path");

module.exports = {
  entry: {
    index: "./src/index.js"
  },
  output: {
    filename: "./static/js/[name]-bundle.js",
    path: path.resolve(__dirname, "../build")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /index\.html$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: './templates/react'
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.(jpg|gif|png|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "./static/images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader:"css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          } 
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader:"css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64]",
              sourceMap: true,
              minimize: true
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "../build/static/react"),
    port: 9000
  },
  plugins: [

  ]
};