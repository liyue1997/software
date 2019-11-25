const path = require('path');
var SERVICE_URL1 = 'http://124.232.150.3:8088';
var B1COMMON_SERVICE_URL = 'http://127.0.0.1:10001';
var COS_SERVICE_URL = 'http://127.0.0.1:10001';
export default {
  outputPath: 'b1common-web',

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
    'AMap': 'AMap',
  },

  proxy: {
    '/b1common': {
      target: B1COMMON_SERVICE_URL,
      pathRewrite: { '^/b1common': '' },
      changeOrigin: true,
      secure: false,
    }
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  disableDynamicImport: true,
  publicPath: '/b1common-web/',
  hash: true,
};
