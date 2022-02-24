const app = require('express');
const router = app.Router();
const {
  postCurrency,
  getCurrrency,
  updataCurrencyStatus,
  updateCurrencyData,
  deletedCurrency,
} = require('../../controller/system/currency');
router.route('/').post(postCurrency).get(getCurrrency);
router.route('/:id').put(updataCurrencyStatus).delete(deletedCurrency);
router.put('/update/:id', updateCurrencyData);
module.exports = router;
