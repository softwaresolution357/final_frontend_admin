const app = require('express');
const { admin_auth, } = require('../../middleware/auth');
const {
  pincodefileuplad,
  getFileData,
  validationPincode,
  updateCODPrepaid,
  getSinglepincode,
  postPincode,
  deleteedPincode
} = require('../../controller/system/pincode/pincodefileuplad');
const router = app.Router();

router.route('/').post(admin_auth,pincodefileuplad).get(admin_auth,getFileData);
router.route('/validation').get(admin_auth,validationPincode);
router.route('/postpincode').post(admin_auth,postPincode);
router.route('/:id').put(admin_auth,updateCODPrepaid).get(admin_auth,getSinglepincode).delete(admin_auth,deleteedPincode);

module.exports = router;
