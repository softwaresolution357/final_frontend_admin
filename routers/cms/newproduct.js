const app = require('express');
const router = app.Router();
const {
  getProductList,
  postProductList,
  productDropdow,
} = require('../../controller/cms/newproduct');
router.route('/').get(getProductList).post(postProductList);
router.route('/dropdown').get(productDropdow);
module.exports = router;
