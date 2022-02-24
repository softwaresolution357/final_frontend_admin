const app = require('express');
const router = app.Router();
const {
  postHomePage,
  getHomePage,
  updateHomePage,
  postHomePageSEO,
  getHomePageSEO,
  putHomePageSEO,
} = require('../../controller/cms/home');
router.route('/').post(postHomePage).get(getHomePage);
router.route('/:id').put(updateHomePage);
router.route('/hamepageseo').post(postHomePageSEO).get(getHomePageSEO);
router.put('/hamepageseo/:id', putHomePageSEO);
module.exports = router;
