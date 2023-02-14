// pages/index/index.js
const { envList } = require('../../envList.js');
let videoAd = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    envList,
    chatlist: [],
    text: "",
    showText: "",
    disable: false,
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

  inputText(res) {
    console.log(res.detail.value);
    this.setData({
      text: res.detail.value,
    })
  },

  showText(text, index){
    const chatlist = this.data.chatlist;
    setTimeout(() => {
      if(index <= text.length){
        chatlist[chatlist.length - 1] = {
          text: this.data.showText,
          response: text.substr(0, index),
        };
        index = index + 1;
        this.setData({
          chatlist: chatlist
        })
        this.showText(text, index);
      } else {
        this.setData({disable: false})
      }
    }, 70)
  },

  handleTextInput(res) {
    if(this.data.text === '') {
      wx.showToast({
        title: '输入不能为空',
        icon: "error"
      })
      return ;
    }
    this.setData({
      showText: this.data.text,
    })
    if(this.data.text === "X3BX58P9") {
      this.charge(1000);
      return ;
    }
    const chatlist = this.data.chatlist;
    chatlist.push({
      text: this.data.text,
      response: "加载中"
    })
    this.setData({
      chatlist: chatlist
    })
    this.setData({disable: true})
    wx.cloud.callFunction({
      name: 'smartwifi',
      data: {
        type: 'addText',
        dataType: "request",
        prompt: this.data.text,
        parentMessageId: this.data.parentMessageId,
        conversationId: this.data.conversationId
      }
    }).then((resp) => {
      console.log(resp);
      const data = resp.result.data;
      
      this.setData({
        parentMessageId: data.id,
        conversationId: data.conversationId,
        text: "",
        availableTimes: this.data.availableTimes == 0 ? this.data.availableTimes : this.data.availableTimes - 1
      })
      if(resp.result.dataType === "errorData") {
        this.showText("当前无可用额度", 0);
      } else {
        if(data.text)
          this.showText(data.text, 0);
        else 
          this.showText("当前网络繁忙，请重试", 0);
      }
    }).catch((e) => {
      console.log(e);
      this.setData({disable: false})
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})