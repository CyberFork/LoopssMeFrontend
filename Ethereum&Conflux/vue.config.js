const path = require('path')
const isProduction = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('components', resolve('src/components'))
      .set('assets', resolve('src/assets'))

    //可视化打包后文件
    isProduction &&
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  },
  configureWebpack: {
    externals: {
      //左侧vue是我们自己引入时候要用的，右侧是开发依赖库的主人定义的不能修改
      moment: 'moment'
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve('src/assets/css/var.less')]
    }
  },
  // devServer: {
  //   // 配置跨域，请求后端接口
  //   open: true,
  //   host: '0.0.0.0',
  //   port: 8080,
  //   https: false,
  //   proxy: {
  //     '/api': {
  //       target: 'http://182.254.241.232:8081/api',
  //       ws: true,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //       //如果服务器不在本地，登录成功后，set-cookie到localhost
  //       // cookieDomainRewrite: "localhost"
  //     }
  //   }
  // }
}
