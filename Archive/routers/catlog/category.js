// Require Thired Party Library
const express = require('express');
const { admin_auth } = require('../../middleware/auth');
const {
  getCategory,
  postCategory,
  updatestatus,
  singlecategoryview,
  edtsinglevalue,
  getCategoryData,
  showcategory,
  deletedCategory,
} = require('../../controller/catlog/catergory');

// config Thired pary library
const router = express.Router();

router.route('/').get(admin_auth,getCategory).post(postCategory);
router.get('/findcategory', getCategoryData);
router.put('/:id', edtsinglevalue);
router.delete('/:id', deletedCategory);
router.get('/getsingleview/:id', singlecategoryview);
router.put('/updatestatus/:id', updatestatus);
router.put('/showcategory/:id', showcategory);
// router.get('/findcategory', getCategoryData);

module.exports = router;
