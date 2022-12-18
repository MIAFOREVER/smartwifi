// pages/qrcode_page/index.js
const { envList } = require('../../envList.js');
const ad = wx.createRewardedVideoAd({
  adUnitId: 'adunit-785b0531168e2987',
  multiton: false,
});
ad.onError((err) => {
  console.log(err);
})

Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcodeId: '',
    envId: envList.envId,
    ssid: '',
    password: '',
    name: '',
  },

  onLoad(options) {
    this.setData({
      qrcodeId: options.scene
    });
    wx.cloud.callFunction({
      name: 'smartwifi',
      config: {
        env: this.data.envId
      },
      data: {
        type: 'selectQrCode',
        qrcodeId: this.data.qrcodeId,
      }
    }).then((res) => {
      var data = res.result.data[0];
      console.log(res.result.data[0]);
      if(!data.isMerchantRegist) {
        wx.redirectTo({
          url: `/pages/merchant_scan/index?id=${this.data.qrcodeId}`,
        })
      } else {
        this.setData({
          name: data.name,
          ssid: data.ssid,
          password: data.password
        })
      }
    }).catch((e) => {
      console.log(e);
    });
    
  },

  showAd() {
    ad.load().then((res) => {
      ad.show().then((res) => {
        console.log(res);
        wx.cloud.callFunction({
          name: 'smartwifi',
          config: {
            env: this.data.envId
          },
          data: {
            type: 'openedQrcodeSuccess',
            qrcodeId: this.data.qrcodeId,
          }
        }).then((res) => {
          console.log(res);
        }).catch((e) => {
          console.log(e);
        });
      }, (err) => {
        console.log(err);
        this.connetWiFi();
      });
    }, (err) => {
      console.log(err);
      this.connetWiFi();
    });
    ad.onClose((res) => {
      if(res.isEnded) {
        this.connetWiFi();
        wx.cloud.callFunction({
          name: 'smartwifi',
          config: {
            env: this.data.envId
          },
          data: {
            type: 'connectQrcodeSuccess',
            qrcodeId: this.data.qrcodeId,
          }
        }).then((res) => {
        }).catch((e) => {
          console.log(e);
        });
      } else {
        wx.showToast({
          icon: "error",
          title: '连接失败！',
        })
      }
    });
    
  },

  connetWiFi() {
    var self = this;
    wx.showLoading({
      title: '正在连接WiFi',
    })
    wx.startWifi({
      success (res) {
        console.log(res.errMsg)
        wx.connectWifi({
          SSID: self.data.ssid,
          password: self.data.password,
          success (res) {
            wx.hideLoading();
            wx.showToast({
              title: '连接成功！',
            })
            console.log(res.errMsg)
          },
          fail(res) {
            wx.hideLoading();
            wx.showToast({
              title: res,
            })
          }
        })
      },
      fail (res) {
        console.log(res);
        
      },
      complete (res) {
        console.log(res);
      }
    })
  }

})