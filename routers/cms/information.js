const app = require('express');
const router = app.Router();
const {
  postInforation,
  getInformation,
  singInformationViewing,
  putSingInformation,
  singleUpdateSwitch,
  updataStatusInformation,
  deletedInformation,
} = require('../../controller/cms/information');

router.route('/').get(getInformation).post(postInforation);
router
  .route('/:id')
  .get(singInformationViewing)
  .put(putSingInformation)
  .delete(deletedInformation);
router.route('/show/:id').put(singleUpdateSwitch);
router.route('/status/:id').put(updataStatusInformation);

module.exports = router;
