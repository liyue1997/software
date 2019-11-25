const path = require('path');
var SERVICE_URL1 = 'http://124.232.150.3:8088';
var B2MAPSHOP_SERVICE_URL3 = 'http://39.105.135.192';
var B2MAPSHOP_SERVICE_URL = 'http://127.0.0.1:12001';
var B2MAPSHOP_SERVICE_URL2 = 'http://192.168.0.250:12001';
export default {
  outputPath: 'b2mapshop-web',

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
    '/b2mapshop': {
      target: B2MAPSHOP_SERVICE_URL,
      pathRewrite: { '^/b2mapshop': '' },
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
  publicPath: '/b2mapshop-web/',
  hash: true,
};
