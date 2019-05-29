const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const port = 9420 // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
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
    }
  }
}
