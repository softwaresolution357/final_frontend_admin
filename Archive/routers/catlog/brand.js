const express = require('express');
const {
  postBrands,
  getBrands,
  deleteBrands,
  singlestatusupdate,
  singleview,
  updateBrand,
} = require('../../controller/catlog/brand');

const router = express.Router();

router.route('/').post(postBrands).get(getBrands);
router.route('/:id').put(updateBrand).delete(deleteBrands);
router.put('/singleupdatestatus/:id', singlestatusupdate);
router.get('/:id', singleview);

module.exports = router;
