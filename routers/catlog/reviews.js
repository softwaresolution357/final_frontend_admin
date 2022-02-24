const app = require('express');
const router = app.Router();
const { admin_auth, } = require('../../middleware/auth');

const {
  postAdminReviews,
  getAdminReviews,
  prductListDropdow,
  SingleReview,
  putSingReview,
  deleteSingleReview,
} = require('../../controller/catlog/reviews');

router.route('/').get(getAdminReviews).post(postAdminReviews);
router.get('/dropdown', prductListDropdow);
router
  .route('/:id')
  .get(SingleReview)
  .put(putSingReview)
  .delete(deleteSingleReview);

module.exports = router;
