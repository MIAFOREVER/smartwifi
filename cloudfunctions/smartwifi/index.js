const addText = require('./addText/index');


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'addText':
      return await addText.main(event, context);
  }
};
