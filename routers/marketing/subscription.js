const app = require('express');
const router = app.Router();
const { admin_auth, } = require('../../middleware/auth');
const {
  getSubscription,
  postSubscription,
} = require('../../controller/marketing/subscription');

router.route('/').get(getSubscription).post(postSubscription);

module.exports = router;
