const app = require('express');
const router = app.Router();
const {
  getTransection,
  postTransection,
} = require('../../controller/sales/transection/transection');
router.route('/').post(postTransection).get(getTransection);

module.exports = router;
