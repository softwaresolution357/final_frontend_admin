const app = require('express');
const router = app.Router();
const { admin_auth, } = require('../../middleware/auth');
const {
  postGalary,
  getGallery,
  deleteGallery,
} = require('../../controller/extra/gallery');

router.route('/').get(getGallery).post(postGalary);
router.route('/:id').delete(deleteGallery);

module.exports = router;
