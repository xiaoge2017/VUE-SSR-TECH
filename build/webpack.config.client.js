const path = require('path')

const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin()
]
const devServer = {
  port: 8000,
  host: '0.0.0.0',
  overlay: {
    errors: true,
  },
  hot: true // 改了一个组件的代码，只重新渲染这个组件，不贵整个页面渲染
}
let config

if (isDev) {
  config=merge(baseConfig, {
    devtool:'#cheap-module-eval-source-map',
    module:{
      rules:[
        {
          test: /\.styl/,
          use: [
            'vue-style-loader', // vue-style-loader有热重载,style-loader
            {
              loader:'css-loader',
              options:{
                module:true,
                localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin() // 不需要信息展示的问题
    ])
  })
} else{
  config=merge(baseConfig, {
    entry: {
      app: path.join(__dirname,'../client/index.js'),
      vendor: ['vue']
    },
    output:{
      filename:'[name].[chunkhash:8].js'
    },
    module:{
      rules:[
        {
          test: /\.styl/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new ExtractPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'verdor'
      }),
      // 在有新的模块加入的时候，webpack是会给新模块加入id的，插入顺序不同，倒是id会变化，使用浏览器的缓存就是去效果，这种方式可以规避。verdor要放在runtime前面
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  })
}
module.exports = config