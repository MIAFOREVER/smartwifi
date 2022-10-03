// pages/sales/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    envId : '',
  },

  bindCreateQrCode() {
    wx.navigateTo({
      url: `../create_qrcode/index?envId=${this.data.envId}`,
    })
  },

  bindMyIncome() {
    wx.navigateTo({
      url: `../sales_income/index?envId=${this.data.envId}`,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      envId: options.envId
    });
    console.log(options);
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