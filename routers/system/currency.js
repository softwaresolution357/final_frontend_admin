const app = require('express');
const router = app.Router();
const { admin_auth, } = require('../../middleware/auth');
const {
  postCurrency,
  getCurrrency,
  updataCurrencyStatus,
  updateCurrencyData,
  deletedCurrency,
} = require('../../controller/system/currency');
router.route('/').post( admin_auth,postCurrency).get( admin_auth,getCurrrency);
router.route('/:id').put( admin_auth,updataCurrencyStatus).delete( admin_auth,deletedCurrency);
router.put('/update/:id', admin_auth, updateCurrencyData);
module.exports = router;
