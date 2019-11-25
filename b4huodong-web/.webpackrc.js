const path = require('path');
var SERVICE_URL1 = 'http://124.232.150.3:8088'; //http://39.105.135.192
var b4huodong_SERVICE_URL2 = 'http://39.105.135.192';
var b4huodong_SERVICE_URL1 = 'http://127.0.0.1:13001';
var b4huodong_SERVICE_URL3 = 'http://192.168.0.250:14001';
var b4huodong_SERVICE_URL = 'http://www.xinxingtech.com.cn/b4huodong';
export default {
  outputPath: 'b4huodong-web',

  entry: 'src/index.js',
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
  },

  externals: {
    AMap: 'AMap',
  },

  proxy: {
    '/b4huodong': {
      target: b4huodong_SERVICE_URL,
      pathRewrite: { '^/b4huodong': '' },
      changeOrigin: true,
      secure: false,
    },
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: true,
  publicPath: '/b4huodong-web/',
  hash: true,
};
