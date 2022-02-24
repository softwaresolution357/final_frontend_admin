const app = require('express');
const router = app.Router();
const {
  postColors,
  getColors,
  updateColor,
  deleteColors,
  putStatus,
  getSingleColor,
} = require('../../controller/catlog/colors');
router.route('/').post(postColors).get(getColors);
router.route('/:id').put(updateColor).delete(deleteColors).get(getSingleColor);
router.route('/status/:id').put(putStatus);
module.exports = router;
