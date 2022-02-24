const checksum_lib = require('../../middleware/paytm/checksum');
exports.paytmMethod = async (req, res, next) => {
  const params = {};
  params.MID = 'BLxnUA80037393895171';
  params.WEBSITE = 'WEBSITE';
  params.ORDER_ID = '1478963257';
  params.CHANNEL_ID = 'WEB';
  params.INDUSTRY_TYPE_ID = 'Retail';
  params.CUST_ID = 'ajskdjfal1245';
  params.TXN_AMOUNT = '100.50';
  params.CALLBACK_URL = 'http://localhost:3000';
  params.EMAIL = 'sunilla1990@gmail.com';
  params.MOBILE_NO = '9438338857';
  checksum_lib.genchecksum(params, 'PdKkmXQhFTv%Wtgv', (err, checksum) => {
    let txn_url = 'https://securegw-stage.paytm.in/order/process';
    let form_fields = '';
    for (x in params) {
      form_fields +=
        "<input type='hidden' name='" + x + "' value='" + params[x] + "'/>";
    }
    form_fields +=
      "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' />";
    var html =
      '<html><body><center><h1>Please wait! Do not refresh the page</h1></center><form method="post" action="' +
      txn_url +
      '" name="f1">' +
      form_fields +
      '</form><script type="text/javascript">document.f1.submit()</script></body></html>';
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(html);
    res.end();
  });
};
