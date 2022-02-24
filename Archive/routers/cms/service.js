const app = require('express');
const router = app.Router();
const {
  postService,
  getServices,
  getSingleService,
  putSingleService,
  deletedServices,
} = require('../../controller/cms/service');
router.route('/').post(postService).get(getServices);
router
  .route('/:id')
  .get(getSingleService)
  .put(putSingleService)
  .delete(deletedServices);
module.exports = router;
