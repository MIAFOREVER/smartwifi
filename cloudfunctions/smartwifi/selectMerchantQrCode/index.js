const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 修改数据库信息云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('wifi_base').where({
      merchantId: event.merchantId
    }).get();
  } catch (e) {
    return {
      success: false,
      errMsg: e
    };
  }
};
