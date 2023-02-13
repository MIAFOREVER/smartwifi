const cloud = require('wx-server-sdk');
var request = require('request-promise');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 修改数据库信息云函数入口函数
exports.main = async (event, context) => {
  try {
    const wxContext = cloud.getWXContext();
    const openid = wxContext.OPENID;
    const res = await db.collection('chatgpt').where({
      _openid: openid
    }).get();
    if(res.data.length === 0){
      await db.collection('chatgpt').add({
        // data 字段表示需新增的 JSON 数据
        data: {
          availableTimes: 10,
          _openid: openid
        },
        success: function(res) {
          console.log(res)
        }
      })
    }
    if(event.dataType === "request"){
      var options = {
        uri: 'http://47.251.5.196:3000/',
        method: 'POST',
        json: {
          "prompt": event.prompt,
          "conversationId": event.conversationId,
          "parentMessageId": event.parentMessageId,
        }
      };
      const result = await db.collection('chatgpt').where({
        _openid: openid
      }).get();
      if(result.data[0].availableTimes > 0) {
        await db.collection('chatgpt').where({
          _openid: openid
        }).update({
          data:{
            availableTimes: result.data[0].availableTimes - 1
          }
        });
        return {
          success: true,
          dateType: "messageData",
          data: await request.post(options),
        }
      } else {
        return {
          success: true,
          dataType: "errorData",
          data: {
            errorMessage: "availableTimesIsEmpty"
          }
        }
      }
    } else if(event.dataType === "charge"){
      const result = await db.collection('chatgpt').where({
        _openid: openid
      }).get();

      await db.collection('chatgpt').where({
        _openid: openid
      }).update({
        data:{
          availableTimes: result.data[0].availableTimes + event.times
        }
      });

      return {
        success: true,
        dataType: "charge",
      };
    } else if(event.dataType === "queryAvailableTimes") {
      const result = await db.collection('chatgpt').where({
        _openid: openid
      }).get();
      return {
        success: true,
        dataType: "query",
        data: {
          availableTimes: result.data[0].availableTimes
        }
      };
    }
    return {
      success: true,
    };
  } catch (e) {
    return {
      success: false,
      errMsg: e
    };
  }
};
