const app = require('express');
const router = app.Router();
const {
  postBlog,
  getBlog,
  getSingleBlog,
  deleteSingleData,
} = require('../../controller/cms/blog');
router.route('/').post(postBlog).get(getBlog);
router.route('/:id').get(getSingleBlog);
router.route('/:id').delete(deleteSingleData);
module.exports = router;
