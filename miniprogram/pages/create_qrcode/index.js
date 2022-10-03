// pages/create_qrcode/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showUploadTip: false,
    haveGetOpenId: false,
    haveGetCodeSrc: false,
    envId: '',
    openId: '',
    codeSrc: '',
    qrcodeId: '',
  },

  getOpenId() {
    wx.showLoading({
      title: '正在生成二维码',
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
     this.createQrCode();
   }).catch((e) => {
      this.setData({
        showUploadTip: true
      });
     wx.hideLoading();
    });
  },

  createQrCode() {
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'notifyCreateQrCode',
        salesId: this.data.openId,
      }
    }).then((res) => {
      console.log(res.result);
      if(res.result.success) {
        this.setData({
          qrcodeId: res.result.qrcodeId
        })
        this.getCodeSrc();
      }
    }).catch((e) => {
      console.log(e);
    });
  },

  getCodeSrc() {
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'getMiniProgramCode',
        qrcodeId: this.data.qrcodeId,
      }
    }).then((resp) => {
      this.setData({
        haveGetCodeSrc: true,
        codeSrc: resp.result
      });
      wx.hideLoading();
    }).catch((e) => {
      console.log(e);
      this.setData({
        showUploadTip: true
      });
      wx.hideLoading();
    });
  },

  downloadQrCodeAndApply() {
    var self = this;
    wx.showModal({
      title: '提示',
      content: '是否存储二维码',
      success: (res) => {
        if(res.confirm) {
          wx.getSetting({
            success(res) {
              if (!res.authSetting['scope.writePhotosAlbum']) {
                wx.authorize({
                  scope:'scope.writePhotosAlbum',
                  success() {
                    wx.cloud.downloadFile({
                      fileID: self.data.codeSrc,
                      success: (result) => {
                        wx.saveImageToPhotosAlbum({
                          filePath: result.tempFilePath,
                          success: function (result) {
                            wx.showModal({
                              title: '保存成功',
                            })
                          },
                          fail: (err) => {
                            wx.showModal({
                              title: "提示",
                              content: "保存二维码失败"
                            })
                          }
                        })
                      },
                      fail: (err) => {
                        wx.showModal({
                          title: "提示",
                          content: "下载二维码失败"
                        })
                      }
                    })
                  },
                  fail: (err) => {
                    wx.showModal({
                      title: "提示",
                      content: "获取相册权限失败"
                    })
                  }
                })
              }
            }
          });
        }
      }
    })
  },

  downloadQrCode() {
    var self = this;
    wx.cloud.downloadFile({
      fileID: self.data.codeSrc,
      success: (result) => {
        wx.saveImageToPhotosAlbum({
          filePath: result.tempFilePath,
          success: function (result) {
            wx.showModal({
              title: '保存成功',
            })
          },
          fail: (err) => {
            self.downloadQrCodeAndApply()
          }
        })
      },
      fail: (err) => {
        console.log(err);
        console.log(self.data.codeSrc);
        wx.showModal({
          title: "提示",
          content: "下载二维码失败"
        })
      }
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