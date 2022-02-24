const app = require('express');
const router = app.Router();
const {admin_auth} =  require('../../middleware/auth');
const {
  postBlog,
  getBlog,
  getSingleBlog,
  deleteSingleData,
  putSingleBlog
} = require('../../controller/cms/blog');
router.route('/').post(postBlog).get(getBlog);
router.route('/:id').get(getSingleBlog).put(putSingleBlog);
router.route('/:id').delete(deleteSingleData);
module.exports = router;
