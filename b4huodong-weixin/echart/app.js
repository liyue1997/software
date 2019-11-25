//app.js
var ttool = require('utils/ttool.js')
var appauth = require('utils/appauth.js')
var webjs = require('utils/webjs.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);
    //用户登录
    appauth.login();
    //获取权限
    webjs.sendPost(
      'api/authority/getnewMenus',
      {
        sysid: 'Z3'
      },
      res => {
        console.log(res)
      }
    )
  },
  globalData: {
    userInfo: null
  }
})