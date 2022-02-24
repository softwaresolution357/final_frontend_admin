const app = require('express');
const router = app.Router();
const { admin_auth, } = require('../../middleware/auth');
const {
  createCoupouns,
  getCoupouns,
} = require('../../controller/marketing/coupouns');
router.route('/').get(getCoupouns).post(createCoupouns);
module.exports = router;
