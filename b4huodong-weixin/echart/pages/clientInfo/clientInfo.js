// pages/clientInfo/clientInfo.js
var ttool = require('../../utils/ttool.js');
var webjs = require('../../utils/webjs.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: {},
    userheadpic: "",
  },
  formSubmit: function(e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const { ...listData
    } = this.data.listData;
    listData.userName = e.detail.value.userName;
    listData.userNumber = e.detail.value.userNumber;
    listData.userPhone = e.detail.value.userPhone;
    listData.userTel = e.detail.value.userTel;
    listData.userQq = e.detail.value.userQq;
    this.setData({
      listData
    });
  },
  //保存
  save: function() {
    var that = this
    if (!this.data.listData.userName) {
      ttool.showerr('请输入用户姓名')
      return;
    }
    if (!ttool.phoneTest(this.data.listData.userPhone)) {
      
      return;
    }
    webjs.sendPost(
      'api/HdShopuser/updateobj',
      this.data.listData,
      res => {
        ttool.showmsg('修改成功')
      }
    );
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var userid = wx.getStorageSync('userid');
    var pic = wx.getStorageSync('userheadpic');
    webjs.sendPost('api/HdShopuser/getobj', {
        id: userid
      },
      res => {
        that.setData({
          listData: res.data.data,
          userheadpic: pic
        });
      });
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

  },

})