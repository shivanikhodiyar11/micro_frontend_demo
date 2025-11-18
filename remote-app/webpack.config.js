const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  entry: './src/index.js',
  mode: 'development',

  devServer: { 
    port: 3001,
    historyApiFallback: true,
    hot: true
  },

  output: { 
    publicPath: 'auto',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },

  // ✅ THIS IS THE PART YOU WERE MISSING
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,    // handle .js or .jsx
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']  // allow importing without extension
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'remote',
      filename: 'remoteEntry.js',
      exposes: {
        './RemoteApp': './src/App.js'
      },
      shared: { 
        react: { singleton: true }, 
        'react-dom': { singleton: true } 
      }
    }),

    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
};
