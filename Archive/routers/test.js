const app = require('express');
const router = app.Router();
const {sendgridTester,GmailTester,dynamicRouting} =  require('../controller/test')
router.post('/',sendgridTester)
router.post('/gmailtester',GmailTester)
router.get('/dynamicrouting',dynamicRouting)

module.exports = router;