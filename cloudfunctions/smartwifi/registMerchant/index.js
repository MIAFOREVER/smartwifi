const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 修改数据库信息云函数入口函数
exports.main = async (event, context) => {
  try {
    await db.collection('wifi_base').where({
      qrcodeId: event.qrcodeId
    }).update({
      // data 字段表示需新增的 JSON 数据
      data: {
        merchantId: event.merchantId,
        ssid: event.ssid,
        password: event.password,
        name: event.name
      },
      success: function(res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      }
    })
    return {
      success: true,
      qrcodeId: qrcodeId
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e
    };
  }
};
