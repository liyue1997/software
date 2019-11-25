// pages/HDDZ/HDDZ.js
var ttool = require('../../utils/ttool.js');
var webjs = require('../../utils/webjs.js');
//翻页,活动名称 翻译
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listData: [],
    hdhuodong: [],
    pagecount: 1,
    noMoreStatus: false
  },

  handleClick: function(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../HdDzInfo/HdDzInfo?id=' + id,
    });
  },

  getHdDzList: function(success) {
    var that = this;
    webjs.sendPostQuery(
      'api/HdDz/queryHdDzList', {
        len: 2,
        page: that.data.pagecount
      },
      res => {
        // console.log("getHdDzList", that.data.listData);
        var oldList = that.data.listData;
        if (res.data.data.list.length != 0) {
          for (var i = 0; i < res.data.data.list.length; i++) {
            oldList.push(res.data.data.list[i]);
          }
          that.setData({
            listData: oldList
          });
        } else {
          that.setData({
            noMoreStatus: true
          });
        }
        success();
      }
    );
  },
  transHuodongName: function() {
    var that = this;
    var temp = [];
    for (var i = 0; i < that.data.listData.length; i++) {
      var hd = that.data.hdhuodong.find(item => item.huodong_id === that.data.listData[i].huodong_id);
      that.data.listData[i].huodong_name = hd.huodong_name;
    }
    that.setData({
      listData: that.data.listData
    })
  },
  getHuodongList: function() {
    var that = this;
    webjs.sendPostQuery(
      'api/HdHuodong/queryHdHuodongList', {
        len: 100,
        page: 1
      },
      res => {
        // console.log(res.data.data.list);
        that.setData({
          hdhuodong: res.data.data.list
        }, () => {
          that.transHuodongName();
        });
      }
    );
  },
  // 加载更多
  getMore: function() {
    var that = this;
    var page = that.data.pagecount + 1;
    that.setData({
      pagecount: page
    }, () => {
      that.getHdDzList(that.transHuodongName);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    that.getHdDzList(that.getHuodongList);
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
    //下拉刷新
    // console.log('下拉刷新')
    var that = this;
    that.setData({
      listData:[],
      hdhuodong:[],
      pagecount:1,
      noMoreStatus:false
    },()=>{
      that.getHdDzList(that.getHuodongList);
    }
    );
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000);
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