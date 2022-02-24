const app = require('express');
const router = app.Router();
const {
  getSizes,
  postSizes,
  putSize,
  deleteSize,
  putStatus,
} = require('../../controller/catlog/sizes');
router.route('/').get(getSizes).post(postSizes);
router.route('/:id').put(putSize).delete(deleteSize);
router.route('/status/:id').put(putStatus);
module.exports = router;
