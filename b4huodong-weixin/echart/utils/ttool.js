const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var rootDocment = 'https://www.xinxingtech.com.cn/b4huodong/';
//获取userid
function getUserid() {
  var userid = wx.getStorageSync('userid');
  return userid;
}
//获取token
function getToken() {
  var token = wx.getStorageSync('token');
  return token;
}
//手机号正则
function phoneTest(phone){
  var myreg = /^[1][1,3,2,4,5,7,8,9][0-9]{9}$/;
  if (!myreg.test(phone)) {
    wx.showToast({
      title: '手机号格式有误',
      icon: 'none',
      duration: 2000
    })
    return false;
  } else {
    return true;
  }
}
//请求成功弹框
function showmsg(msg){
  wx.showToast({
    title: msg,
    icon: 'success',
    duration: 2000
  });
}
//请求失败弹框
function showerr(err){
  wx.showToast({
    title: err,
    icon: 'none',
    duration: 2000
  });
}
module.exports = {
  formatTime: formatTime,
  rootDocment: rootDocment,
  phoneTest: phoneTest,
  showmsg: showmsg,
  showerr: showerr,
  getUserid: getUserid,
  getToken: getToken
}