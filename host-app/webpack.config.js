const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devtool: 'cheap-module-source-map',

  devServer: {
    port: 3000,  // ✅ Host app runs on 3000
    historyApiFallback: true,
    hot: true,
  },

  output: {
    publicPath: 'auto',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  // ✅ MOST IMPORTANT PART — enables JSX via Babel
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'host',   // ✅ Host app SHOULD be named "host"

      remotes: {
        // Remote app is loaded here
        remote: 'remote@http://localhost:3001/remoteEntry.js'
      },

      // No exposes for host-app
      shared: {
        react: { singleton: true, eager: false },
        'react-dom': { singleton: true, eager: false }
      }
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
};
