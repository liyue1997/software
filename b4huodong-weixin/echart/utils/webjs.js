//请求方法
var rootDocment = 'https://www.xinxingtech.com.cn/b4huodong/';
var token = [];

function sendPostQuery(url, data, successhandle, failhandle) {
  wx.showLoading({
    title: '加载中',
  });
  wx.getStorage({
    key: 'token',
    success: function (res) {
      token = res.data
      wx.request({
        url: rootDocment + url,
        method: 'POST',
        header: {
          'content-type': 'application/json;charset=UTF-8',
          'token': token
        },
        data: data,
        success(res) {
          wx.hideLoading();
          if (res.data.code === "200") {
            successhandle(res);
          } else {
            if (failhandle) {
              failhandle(res.data.msg);
            }
            else {
              wx.showToast({
                title: res.data.msg,
                icon: 'fail',
                duration: 2000
              });
            }
          }
        },
        fail(res) {
          wx.hideLoading();
          wx.showToast({
            title: '网络异常',
            icon: 'fail',
            duration: 2000
          });
        }
      })
    },
  })
}
function sendPost(url, data, successhandle,failhandle) {
  wx.showLoading({
    title: '加载中',
  });
  wx.getStorage({
    key: 'token',
    success: function(res) {
      token = res.data
      wx.request({
        url: rootDocment + url,
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'token': token   
        },
        data: data,
        success(res) {
          wx.hideLoading();
          if (res.data.code === "200") {
            successhandle(res);
          } else {
            if (failhandle){
              failhandle(res.data.msg);
            }
            else
            {
              wx.showToast({
                title: res.data.msg,
                icon: 'fail',
                duration: 2000
              });
            }
          }
        },
        fail(res) {
          wx.hideLoading();
          wx.showToast({
            title: '网络异常',         
            icon: 'fail',
            duration: 2000
          });
        }
      })
    },
  })
}

function sendGet(url, successhandle, failhandle) {
  wx.showLoading({
    title: '加载中',
  })
  wx.request({
    url: rootDocment + url,
    method: 'GET',
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success(res) {
      wx.hideLoading();
      if (res.data.ret === "success") {
        successhandle(res);
      } else {
        failhandle(res)
        wx.showToast({
          title: res.data.info,
          icon: 'none',
          duration: 2000
        });
      }
    },
    fail(res) {
      wx.showToast({
        title: res.data.info,
        icon: 'fail',
        duration: 2000
      });
    }
  })
}
module.exports = {
  sendPost: sendPost,
  sendGet: sendGet,
  sendPostQuery: sendPostQuery
}