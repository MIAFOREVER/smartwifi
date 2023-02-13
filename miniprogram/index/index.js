// pages/index/index.js
const { envList } = require('../../envList.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    envList,
    chatlist: [{
      text: "欢迎使用 ChatGPT AI 对话",
      response: "谢谢！"
    }],
    text: "",
  },

  inputText(res) {
    console.log(res.detail.value);
    this.setData({
      text: res.detail.value
    })
  },

  handleTextInput(res) {
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name: 'smartwifi',
      data: {
        type: 'addText',
        prompt: this.data.text,
        parentMessageId: this.data.parentMessageId,
        conversationId: this.data.conversationId
      }
    }).then((resp) => {
      const data = resp.result;
      console.log(data);
      const chatlist = this.data.chatlist;
      chatlist.push({
          text: this.data.text,
          response: data.text,
        });
      console.log(chatlist)
      this.setData({
        chatlist: chatlist,
        parentMessageId: data.id,
        conversationId: data.conversationId,
        text: ""
      })
      wx.hideLoading()
    }).catch((e) => {
      console.log(e);
      wx.hideLoading()
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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