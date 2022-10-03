// pages/index/index.js
const { envList } = require('../../envList.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    envList,
  },

  bindMerchantTap() {
    wx.navigateTo({
      url: '../merchant/index' + "?envId=" + envList.envId,
    })
  },
  bindSalesTap() {
    wx.navigateTo({
      url: `../sales/index?envId=${this.data.envList[0].envId}`,
    })
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