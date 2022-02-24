const app = require('express');
const router = app.Router();
const { admin_auth, } = require('../../middleware/auth');
const {
  postStatus,
  getStatus,
  updateStatus,
  deleteStatus,
  putStatus,
  getSingleStatus,
  singlePutUpdateStatus,
} = require('../../controller/catlog/status');
router.route('/').post(postStatus).get(getStatus);
router
  .route('/:id')
  .put(updateStatus)
  .delete(deleteStatus)
  .get(getSingleStatus);
router.route('/status/:id').put(putStatus);
router.route('/updatestatus/:id').put(singlePutUpdateStatus);
module.exports = router;
