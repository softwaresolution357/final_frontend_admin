const app = require('express');
const { admin_auth, } = require('../../middleware/auth');
const router = app.Router();
const {
  getAllInvoice,
  dowloadinvoice,
} = require('../../controller/sales/invoice/invoice');
router.route('/').get(getAllInvoice);
router.route('/:id').get(dowloadinvoice);

module.exports = router;
