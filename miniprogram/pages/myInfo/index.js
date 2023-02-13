// index.js
// const app = getApp()
const { envList } = require('../../envList.js');

// 在页面中定义激励视频广告
let videoAd = null

Page({
  data: {

  },

  charge(times){
    wx.cloud.callFunction({
      name: 'smartwifi',
      data: {
        type: 'addText',
        dataType: 'charge',
        times: times
      }
    }).then(res => {
      this.setData({
        availableTimes: this.data.availableTimes + times
      })
    })
  },

  onLoad(){
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-785b0531168e2987'
      })
      videoAd.onLoad(() => {})
      videoAd.onError((err) => {})
      videoAd.onClose((res) => {
        if(res.isEnded) {
          this.charge(5);
        }
      })
    }
  },

  onShow(){
    wx.cloud.callFunction({
      name: 'smartwifi',
      data: {
        type: 'addText',
        dataType: 'queryAvailableTimes'
      }
    }).then(res => {
      console.log(res);
      this.setData({
        availableTimes: res.result.data.availableTimes
      })
    })
  },

  chargeAvailableTimes(){

  },

  shareToChargeAvailableTimes(){

  },

  watchVideoToChargeAvailableTimes(){
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.log('激励视频 广告显示失败')
          })
      })
    }
  },

  onShareAppMessage() {
    const promise = new Promise(resolve => {
      const today = new Date();
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const formattedDate = today.toLocaleDateString('zh-CN', options);
      console.log(formattedDate)

      wx.getStorage({
        key: "date",
        success: res => {
          if(res.data === formattedDate) {
            wx.setStorage({
              key: "date",
              data: formattedDate
            })
          } else {
            wx.setStorage({
              key: "date",
              data: formattedDate
            })
            this.charge(20);
          }
        },
        fail: res => {
          wx.setStorage({
            key: "date",
            data: formattedDate
          })
          this.charge(20);
        },
      })
      
      setTimeout(() => {
        resolve({
          title: "ChatGPT 免费使用",
          path: '/pages/index/index',
          imageUrl: 'cloud://smartwlan-6gh4j3p0f8d0903e.736d-smartwlan-6gh4j3p0f8d0903e-1314487287/Snipaste_2023-02-13_02-37-02.jpg',
        })
      }, 500)
    })
    return {
      title: "ChatGPT 免费使用",
      path: '/pages/index/index',
      imageUrl: 'cloud://smartwlan-6gh4j3p0f8d0903e.736d-smartwlan-6gh4j3p0f8d0903e-1314487287/Snipaste_2023-02-13_02-37-02.jpg',
      promise 
    }
  },

  onShareTimeline(){
    return {
      imageUrl: 'cloud://smartwlan-6gh4j3p0f8d0903e.736d-smartwlan-6gh4j3p0f8d0903e-1314487287/Snipaste_2023-02-13_02-37-02.jpg',
      title: "ChatGPT 免费使用"
    }
  }
});
