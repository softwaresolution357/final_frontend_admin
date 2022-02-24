const app = require('express');
const router = app.Router();
const {usercount,getUsercount} = require('../../controller/cms/usercount')
router.post('/',usercount)
router.get('/usercount',getUsercount)

module.exports = router