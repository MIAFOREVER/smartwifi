const cloud = require('wx-server-sdk');

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});
const db = cloud.database();

// 获取小程序二维码云函数入口函数
exports.main = async (event, context) => {
  // 获取小程序二维码的buffer
  const resp = await cloud.openapi.wxacode.getUnlimited({
    scene: `id=${event.qrcodeId}`,
    path: `pages/merchant_scan/index` ,
    "checkPath": true,
  });
  const { buffer } = resp;
  // 将图片上传云存储空间
  const upload = await cloud.uploadFile({
    cloudPath: `${event.qrcodeId}.png`,
    fileContent: buffer
  });
  await db.collection('wifi_base').where({
      qrcodeId: event.qrcodeId
    }).update({
    // data 字段表示需新增的 JSON 数据
    data: {
      imgID: upload.fileID
    },
    success: function(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    }
  })
  return upload.fileID;
};
