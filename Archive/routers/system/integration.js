const app = require('express');
const {
  postIntegration,
  getIntegration,
  putIntegration
} = require('../../controller/system/integration');
const router = app.Router();
router.route('/').post(postIntegration).get(getIntegration).put(putIntegration);

module.exports = router;
