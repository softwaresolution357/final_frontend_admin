const app = require('express');
const router = app.Router();
const { admin_auth, } = require('../../middleware/auth');
const { update } = require('../../middleware/auth');
const {
  getAllOrder,
  viewOrder,
  getExcelorder,
  updateOrderStatus,
  getSingleOrder,
  putSingleOrder,
  getAllOrderdate,
  getAllOrderid
} = require('../../controller/sales/order/order');
const {
  loginOrderData,
} = require('../../controller/sales/order/loginorderdata');
const { guestOrderData } = require('../../controller/sales/order/guestorder');
const {
  registerOrderData,
} = require('../../controller/sales/order/registerorder');
const {
  userloginOrderData,
} = require('../../controller/sales/order/userloginorderdata');

router.route('/').get(getAllOrder);
router.get('/vieworder', viewOrder);
router.get('/getexcelorder', getExcelorder);
router.post('/loginorderdata', update, loginOrderData);
router.post('/guestorder', guestOrderData);
router.post('/registerorder', registerOrderData);
router.post('/loginorder', userloginOrderData);
router.get('/getallorder', getAllOrder);
router.get('/getallorderdate/:startdate/:enddate', getAllOrderdate);
router.get('/getallorderid/:startid/:endid', getAllOrderid);
router.put('/:id', updateOrderStatus);
router.get('/:id', getSingleOrder);
router.put('/update/:id', putSingleOrder);

module.exports = router;
