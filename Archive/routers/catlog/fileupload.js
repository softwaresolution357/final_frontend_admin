const app = require('express');
const router = app.Router();
const {
  UploadFile,
  DeletedFile,
} = require('../../controller/catlog/fileupload');

router.post('/', UploadFile);

router.delete('/:id/:type', DeletedFile);

module.exports = router;
