const app = require('express');
const router = app.Router();
const { admin_auth, } = require('../../middleware/auth');
const {
  viewgeneralInfomation,
  postgeneralInfomation,
  updategeneral,
  firstShippingStatus,
  freeShippingStatus,
} = require('../../controller/system/general');
router.route('/').get(viewgeneralInfomation).post(postgeneralInfomation);
router.route('/:id').put(updategeneral);
router.route('/freeshipping/:id').put(freeShippingStatus);
router.route('/firtshshipping/:id').put(firstShippingStatus);
module.exports = router;
