const app = require('express');
const router = app.Router();
const { CancelDetails } = require('../../controller/sales/canelrefundrepalce');
router.route('/').get(CancelDetails);
module.exports = app;
