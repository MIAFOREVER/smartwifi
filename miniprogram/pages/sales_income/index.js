// pages/sales_income/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveGetOpenId: false,
    openId: '',
    myQrCode: [],
  },

  getOpenId() {
    wx.cloud.callFunction({
      name: 'smartwifi',
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
     this.selectSalesIncome()
   }).catch((e) => {
      this.setData({
        showUploadTip: true
      });
     wx.hideLoading();
    });
  },

  selectSalesIncome() {
    wx.cloud.callFunction({
      name: 'smartwifi',
      config: {
        env: this.data.envId
      },
      data: {
        salesId: this.data.openId,
        type: 'selectSalesQrCode',
      }
    }).then((resp) => {
      this.setData({
        myQrCode: resp.result.data
      })
      console.log(resp.result.data);
    }).catch((e) => {
      this.setData({
        showUploadTip: true
      });
    });
  },

  deleteQrcode(e){
    console.log(e)
    wx.cloud.callFunction({
      name: 'smartwifi',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'deleteQrcode',
        qrcodeId: e.currentTarget.dataset.qrcodeid
      }
    }).then((resp) => {
      wx.showToast({
        title: '删除成功！',
      })
      this.selectSalesIncome();
    }).catch((e) => {
      console.log(e);
    });
  },

  jumpToManage(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/sales_qrcode_manage/index?qrcodeId=' + e.currentTarget.dataset.qrcodeid,
    })
  },

  previewQrCode(e) {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getOpenId();
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