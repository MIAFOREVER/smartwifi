// pages/create_qrcode/index.js
const { envList } = require('../../envList.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetOpenId: false,
    haveGetCodeSrc: false,
    merchantName: '',
    envId: envList.envId,
    openId: '',
    codeSrc: '',
    name: '',
    ssid: '',
    password: '',
    qrcodeId: '',
  },

  formSubmit(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    this.setData({
      name: e.detail.value.name,
      ssid: e.detail.value.ssid,
      password: e.detail.value.password,
    })
    this.getOpenId();
  },

  getOpenId() {
    wx.showLoading({
      title: '正在注册二维码',
    });
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getOpenId',
      }
    }).then((resp) => {
      this.setData({
        haveGetOpenId: true,
        openId: resp.result.openid
      });
     console.log(this.data.openId);
     this.registMerchant();
   }).catch((e) => {
     console.log(e);
     wx.hideLoading();
    });
  },

  registMerchant() {
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'registMerchant',
        name: this.data.name,
        merchantId: this.data.openId,
        ssid: this.data.ssid,
        password: this.data.password,
        qrcodeId: this.data.qrcodeId,
      }
    }).then((resp) => {
      wx.hideLoading();
      wx.showToast({
        title: '注册成功！',
      })
   }).catch((e) => {
      console.log(e);
      wx.hideLoading();
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      qrcodeId: options.id
    })
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