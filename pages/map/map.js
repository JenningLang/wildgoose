// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0,
    include_points: [
      {
        latitude: '',
        longitude: ''
      },
      {
        latitude: 39.98661,
        longitude: 116.32115,
      },
    ],
    targetMarker: [{
      iconPath: "/images/target-pos.png",
      id: 0,
      latitude: 39.98661,
      longitude: 116.32115,
      width: 30,
      height: 35
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      latitude: options.latitude,
      longitude: options.longitude,
    })
    this.jumpToCurrentLoc();
  },

  jumpToCurrentLoc: function(){
    var pageData = this;
    wx.getLocation({
      success: function (res) {
        pageData.setData({
          include_points: [
            {
              latitude: res.latitude,
              longitude: res.longitude
            },
            {
              latitude: 39.98661,
              longitude: 116.32115,
            },
          ],
        });
      },
    })
  }

})