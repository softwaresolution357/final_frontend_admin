const app = require('express');
const router = app.Router();
const { admin_auth, } = require('../../middleware/auth');
const {
  getTransection,
  postTransection,
} = require('../../controller/sales/transection/transection');
router.route('/').post(postTransection).get(getTransection);

module.exports = router;
