const app = require('express');
const router = app.Router();
const { getAllMobile } = require('../../controller/marketing/sms');
router.route('/').get(getAllMobile);
module.exports = router;
