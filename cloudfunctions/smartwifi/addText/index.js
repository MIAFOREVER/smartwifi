const cloud = require('wx-server-sdk');
var request = require('request-promise');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 修改数据库信息云函数入口函数
exports.main = async (event, context) => {
  try {
    var options = {
      uri: 'http://47.251.5.196:3000/',
      method: 'POST',
      json: {
        "prompt": event.prompt,
        "conversationId": event.conversationId,
        "parentMessageId": event.parentMessageId,
      }
    };
    return await request.post(options);
  } catch (e) {
    return {
      success: false,
      errMsg: e
    };
  }
};
