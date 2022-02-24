const app = require('express');
const {
  pincodefileuplad,
  getFileData,
  validationPincode,
  updateCODPrepaid,
  getSinglepincode,
  postPincode,
} = require('../../controller/system/pincode/pincodefileuplad');
const router = app.Router();

router.route('/').post(pincodefileuplad).get(getFileData);
router.route('/validation').get(validationPincode);
router.route('/postpincode').post(postPincode);
router.route('/:id').put(updateCODPrepaid).get(getSinglepincode);

module.exports = router;
