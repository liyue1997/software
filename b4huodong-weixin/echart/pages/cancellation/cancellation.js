// pages/cancellation/cancellation.js
var ttool = require('../../utils/ttool.js');
var webjs = require('../../utils/webjs.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    result: [],
    status: false,
    userid: [],
    token: [],
    listData: []
  },
  //券码输入框失焦
  coupon: function(e) {
    var that = this;
    var userid = that.data.userid;
    webjs.sendGet(
      'app/huodong?command=getpayorder&userid=' + userid + '&payorder=' + e.detail.value,
      res => {
        that.setData({
          listData: res.data.data,
          status: true,
          result: e.detail.value
        })
      },
      res => {
        that.setData({
          status: false
        });
      }
    )
  },

  //扫码
  scan: function(e) {
    var that = this;
    var token = that.data.token;
    var userid = that.data.userid;
    that.data.status = false;
    wx.scanCode({
      success(res) {
        console.log(res);
        that.setData({
          result: res.result,
          status: true
        });
        webjs.sendGet(
          'app/huodong?command=getpayorder&userid=' + userid + '&payorder=' + that.data.result,
          res => {
            that.setData({
              listData: res.data.data
            });
          },
          res => {
            that.setData({
              status: false
            });
          }
        )
      },
      fail: function(e) {
        wx.showToast({
          title: '扫码失败',
          icon: 'none',
          duration: 2000
        });
        that.setData({
          status: false
        });
      }
    })
  },
  //核销
  hexiao: function(e) {
    var that = this;
    var token = that.data.token;
    var userid = that.data.userid;
    if (that.data.result.length === 0) {
      ttool.showerr('请先扫码验证')
    } else {
      webjs.sendGet(
        'app/huodong?command=hxpayorder&userid=' + userid + '&payorder=' + that.data.result,
        res => {
          wx.showToast({
            title: '核销成功:' + res.data.info,
            icon: 'none',
            duration: 2000
          });
        },
        res => {}
      )
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var userid = that.data.userid;
    wx.getStorage({
      key: 'userid',
      success: function(res) {
        that.setData({
          userid: res.data
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})