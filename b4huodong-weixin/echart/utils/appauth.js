//权限
var ttool = require('./ttool.js')
var webjs = require('./webjs.js')

function getMenu() {

}

function getOprs() {

}

function login() {
  // 登录
  wx.login({
    success: res => {
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      console.log(res.code);
      webjs.sendGet(
        `app/huodong?command=miniprogramLogin&code=${res.code}`,
        e => {
          ttool.showmsg("登录成功");
          wx.setStorageSync('token', e.data.token);
          wx.setStorageSync('userid', e.data.userid);
          wx.setStorageSync('userheadpic', e.data.userheadpic);
          wx.setStorageSync('shopid', e.data.shopid);
          console.log(e.data);
        }
      )
    }
  });
  // 获取用户信息
  wx.getSetting({
    success: res => {
      if (res.authSetting['scope.userInfo']) {
        // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
        wx.getUserInfo({
          success: res => {
            console.log(res)
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo = res.userInfo
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
      }
    }
  })
}
module.exports = {
  login: login
}