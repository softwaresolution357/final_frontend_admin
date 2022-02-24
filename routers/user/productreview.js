const app = require('express');
const router = app.Router();
const { productReview } = require('../../controller/catlog/reviews');
const { admin_auth, } = require('../../middleware/auth');
router.route('/').post(admin_auth,productReview);

module.exports = router;
