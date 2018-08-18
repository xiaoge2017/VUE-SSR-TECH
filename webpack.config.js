const path = require('path')

const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtractPlugin = require('extract-text-webpack-plugin')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry:path.join(__dirname,'src/index.js'),
  output: {
    filename: 'bundle[hash:8].js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|jpg|jepg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-aaa.[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
}

if (isDev) {
  config.module.rules.push({
      test: /\.styl/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          }
        },
        'stylus-loader'
      ]
  })
  config.devtool = '#cheap-module-eval-source-map' // 浏览器打开后，通过映射以编译后我们能看懂方式调整，source-map最完整映射关系，但是编译效率比较低，文件比较大，eval可能看起来会比较乱，出现行对应不齐的问题。而推荐的这个效率比较高
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    hot: true // 改了一个组件的代码，只重新渲染这个组件，不贵整个页面渲染
    // historyFallback: {

    // }// 入口地址映射，(略)
    // open: true //启动后自动打开页面
  },
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin() // 不需要信息展示的问题
  )
} else{
  config.entry = {
    app: path.join(__dirname,'src/index.js'),
    vendor: ['vue']
  }
  // config.output.filename = '[name].[hash:8].js'
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl/,
      use: ExtractPlugin.extract({
        fallback: 'style-loader',
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
  ),
  config.plugins.push(
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'verdor'
    }),
    // 在有新的模块加入的时候，webpack是会给新模块加入id的，插入顺序不同，倒是id会变化，使用浏览器的缓存就是去效果，这种方式可以规避。verdor要放在runtime前面
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    })
  )
}

module.exports = config