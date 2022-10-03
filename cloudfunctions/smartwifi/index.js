const getOpenId = require('./getOpenId/index');
const getMiniProgramCode = require('./getMiniProgramCode/index');
const notifyCreateQrCode = require('./notifyCreateQrCode/index');
const selectSalesQrCode = require('./selectSalesQrCode/index');
const registMerchant = require('./registMerchant/index');


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getOpenId':
      return await getOpenId.main(event, context);
    case 'getMiniProgramCode':
      return await getMiniProgramCode.main(event, context);
    case 'notifyCreateQrCode':
      return await notifyCreateQrCode.main(event, context);
    case 'selectSalesQrCode':
      return await selectSalesQrCode.main(event, context);
    case 'registMerchant':
      return await registMerchant.main(event, context);
  }
};
