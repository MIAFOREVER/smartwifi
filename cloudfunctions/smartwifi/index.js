const getOpenId = require('./getOpenId/index');
const addText = require('./addText/index');


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getOpenId':
      return await getOpenId.main(event, context);
    case 'addText':
      return await addText.main(event, context);
  }
};
