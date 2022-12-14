import WxPay from 'wechatpay-node-v3'; // 支持使用require
import fs from 'fs';

const pay = new WxPay({
  appid: 'wxb25008f7cdc4f66c',
  mchid: '1633796488',
  publicKey: fs.readFileSync('../key/apiclient_cert.pem'), // 公钥
  privateKey: fs.readFileSync('../key/apiclient_key.pem'), // 秘钥
});

exports.main = async (event, context) => {
  try {
    const certificates = await pay.get_certificates("APIv3密钥");
    // 我这里取最后一个 
    const certificate = certificates.pop();

    const res = await pay.batches_transfer({
      out_batch_no: 'plfk2020042013',
      batch_name: '2019年1月深圳分部报销单',
      batch_remark: '2019年1月深圳分部报销单',
      total_amount: 4000000,
      total_num: 200,
      wx_serial_no: certificate.serial_no, // 当你需要传user_name时 需要传当前参数
      transfer_detail_list: [
        {
          out_detail_no: 'x23zy545Bd5436',
          transfer_amount: 200000,
          transfer_remark: '2020年4月报销',
          openid: 'ozKKW5f7OAvPcPbgb7Q784qqpXdw',
          user_name: pay.publicEncrypt('张三', Buffer.from(certificate.publicKey)),
        }
      ],
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}