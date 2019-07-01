const path = require('path')
const webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const port = 9420 // dev port

module.exports = {
  // publicPath: '/',
  // outputDir: 'dist',
  // assetsDir: 'static',
  devServer: {
    port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
    // proxy: {
    //   // change xxx-api/login => mock/login
    //   // detail: https://cli.vuejs.org/config/#devserver-proxy
    //   [process.env.VUE_APP_BASE_API]: {
    //     target: `http://127.0.0.1:${port}/mock`,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + process.env.VUE_APP_BASE_API]: ''
    //     }
    //   }
    // },
    // after: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'name',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    //  为了节约编译的时间，这时间我们需要告诉 webpack 公共库文件已经编译好了，减少 webpack 对公共库的编译时间
    plugins: [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./public/vendor/vendor-manifest.json')
      })
    ],
    performance: {
      hints: 'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 100000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 100000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  }
}
