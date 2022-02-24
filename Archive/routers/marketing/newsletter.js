const app = require('express');
const router = app.Router();
const {
  getNewsletter,
  postNewsletter,
} = require('../../controller/marketing/newsletter');
router.route('/').get(getNewsletter).post(postNewsletter);
module.exports = router;
