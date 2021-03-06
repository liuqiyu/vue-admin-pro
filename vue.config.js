/*
 * @Description: webpack 配置
 * @Author: liuqiyu
 * @Date: 2019-10-09 14:47:52
 * @LastEditors: liuqiyu
 * @LastEditTime: 2019-12-17 13:46:25
 */
const path = require('path')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)
const StylelintPlugin = require("stylelint-webpack-plugin");
const defaultSettings = require('./src/settings.js')

function resolve (dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || 'vue Admin Pro' // page title

const port = 9420 // dev port

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  // assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false, // 关闭map配置
  devServer: {
    port, // 代理端口
    open: true, // 是否自动打开浏览器
    // 让浏览器 overlay 同时显示警告和错误
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5858', // 目标代理接口地址
        secure: false,
        changeOrigin: true, // 开启代理，在本地创建一个虚拟服务端
        // ws: true, // 是否启用websockets
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  css: {
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/style/variable.scss";
        `
      }
    }
  },
  configureWebpack: config => {
    const plugins = [];
    if (!IS_PROD) {
      plugins.push(
        new StylelintPlugin({
          files: ["src/**/*.vue", "src/style/**/*.scss"],
          fix: false //打开自动修复（谨慎使用！注意上面的配置不要加入js或html文件，会发生问题，js文件请手动修复）
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  // 删除moment除zh-cn中文包外的其它语言包，无需在代码中手动引入zh-cn语言包。
  chainWebpack: config => {
    // 打包分析
    if (IS_PROD) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("static", resolve("public/static"))

    // it can improve the speed of the first screen, it is recommended to turn on preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    config
      .plugin('ignore')
      .use(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/))

    return config
  }
}
