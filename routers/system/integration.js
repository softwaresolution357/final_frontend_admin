const app = require('express');
const { admin_auth, } = require('../../middleware/auth');
const {
  postIntegration,
  getIntegration,
  putIntegration
} = require('../../controller/system/integration');
const router = app.Router();
router.route('/').post(admin_auth,postIntegration).get(admin_auth,getIntegration).put(admin_auth,putIntegration);

module.exports = router;
