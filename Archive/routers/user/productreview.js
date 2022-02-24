const app = require('express');
const router = app.Router();
const { productReview } = require('../../controller/catlog/reviews');

router.route('/').post(productReview);

module.exports = router;
