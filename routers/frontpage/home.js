const express = require('express');
const router = express.Router();
const {
  homeCategory,
  homePage,
  Currency,
  Integration,
  ProductItem,
  Common,
} = require('../../controller/homefrontend');
router.get('/category', homeCategory);
router.get('/homepage', homePage);
router.get('/currency', Currency);
router.get('/integration', Integration);
router.get('/item/:slug', ProductItem);
router.get('/common', Common);

module.exports = router;
