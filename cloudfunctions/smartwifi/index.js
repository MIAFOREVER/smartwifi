const getOpenId = require('./getOpenId/index');
const getMiniProgramCode = require('./getMiniProgramCode/index');
const notifyCreateQrCode = require('./notifyCreateQrCode/index');
const selectSalesQrCode = require('./selectSalesQrCode/index');
const selectMerchantQrCode = require('./selectMerchantQrCode/index');
const registMerchant = require('./registMerchant/index');
const selectQrCode = require('./selectQrCode/index');
const deleteQrcode = require('./deleteQrcode/index');


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
    case 'selectMerchantQrCode':
      return await selectMerchantQrCode.main(event, context);
    case 'registMerchant':
      return await registMerchant.main(event, context);
    case 'selectQrCode':
      return await selectQrCode.main(event, context);
    case 'deleteQrcode':
      return await deleteQrcode.main(event, context);
  }
};
