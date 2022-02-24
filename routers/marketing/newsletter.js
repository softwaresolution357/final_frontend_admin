const app = require('express');
const router = app.Router();
const { admin_auth, } = require('../../middleware/auth');
const {
  getNewsletter,
  postNewsletter,
} = require('../../controller/marketing/newsletter');
router.route('/').get(getNewsletter).post(postNewsletter);
module.exports = router;
