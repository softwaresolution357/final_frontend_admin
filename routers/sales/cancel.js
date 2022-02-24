const app = require('express');
const { admin_auth, } = require('../../middleware/auth');
const router = app.Router();
const { CancelDetails } = require('../../controller/sales/canelrefundrepalce');
router.route('/').get(CancelDetails);
module.exports = app;
