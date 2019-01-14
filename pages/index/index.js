//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    showLogin: false,
    hasUserInfo: false,
    rejectTip1: false,
    rejectTip2: false,
    rejectTip3: false,
    hasAp: true,
    location: {'showMap': false},
    tabSelected: 'invited-tab',
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  setUserInfo: function(uInfo){
    this.setData({
      userInfo: uInfo,
      showLogin: false,
      hasUserInfo: true,
      rejectTip1: false,
      rejectTip2: false,
      rejectTip3: false,
    });
    wx.hideLoading();
  },
  onLoad: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.getUserInfo({
      success: res => {
        app.globalData.userInfo = res.userInfo
        this.setUserInfo(res.userInfo);
      },
      fail: res => {
        this.setData({
          showLogin: true,
        });
        wx.hideLoading();      
      }
    })
  },
  getUserInfo: function (e) {
    console.log(e);
    if (e.detail.userInfo != null) {
      app.globalData.userInfo = e.detail.userInfo;
      this.setUserInfo(e.detail.userInfo);
    } else {
      if (!this.data.rejectTip1 && !this.data.rejectTip2 && !this.data.rejectTip3) {
        this.setData({
          rejectTip1: true
        })
      } else if (this.data.rejectTip1 && !this.data.rejectTip2) {
        this.setData({
          rejectTip1: false,
          rejectTip2: true
        })
      } else if (!this.data.rejectTip1 && this.data.rejectTip2) {
        this.setData({
          rejectTip2: false,
          rejectTip3: true
        })
      }
    }
  },
  toggleShowMap: function (e) {
    var showMap = this.data.location.showMap;
    this.setData({
      location: {"showMap": !showMap}
    });
  },
  menuTapped: function (e) {
    var tappedId = e.currentTarget.id;
    if (tappedId == 'menu-invited-tap-area' && this.data.tabSelected == 'i-invite-tab') {
      this.setData({ tabSelected: 'invited-tab'});
    } else if (tappedId == 'menu-i-invite-tap-area' && this.data.tabSelected == 'invited-tab') {
      this.setData({ tabSelected: 'i-invite-tab' });
    }
  }
})
