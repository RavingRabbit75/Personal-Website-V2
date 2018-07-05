const path = require("path");

module.exports = {
  entry: {
    index: "./src/index_dev.js"
  },
  output: {
    filename: "index-bundle.js",
    path: path.resolve(__dirname, "../build/static/react")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      { 
        test: /index_dev\.html$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "index.html",
            }
          },
          {
            loader: "extract-loader"
          },
          {
            loader: "html-loader",
            options: {
              attrs: ["img:src"]
            }
          }
        ]
      },
      {
        test: /\.(jpg|gif|png|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "imgs/[name].[ext]"
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
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "../build/static/react"),
    port: 9000
    // contentBase: "./build/react"
  },
  plugins: [

  ]
};