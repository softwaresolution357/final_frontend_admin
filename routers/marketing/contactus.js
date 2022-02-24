const app = require('express');
const { admin_auth, } = require('../../middleware/auth');
const router = app.Router();
const {
  PostContact,
  getContactus,
  postContactquery,
  getContactQuery,
  putContactquery,
  deleteContactus,
  SingleContact,
  updateSingleStatus
} = require('../../controller/marketing/contactus');
router.route('/').get(getContactus).post(PostContact);
router.route('/:id').delete(deleteContactus);
router.route('/contactquery').post(postContactquery).get(getContactQuery);
router.route('/contactquery/:id').put(putContactquery);
router.route('/:id').get(SingleContact).put(updateSingleStatus)
module.exports = router;
