const express = require('express');
const router = express.Router();
const { admin_auth, } = require('../../middleware/auth');
const {OrderReport} = require('../../controller/report/orderreport')
const {PrderReport,ProductSalesReport} = require('../../controller/report/productreport')
const {ProductVisitorReport} = require('../../controller/report/visitor')
router.get('/orderreport', OrderReport);
router.get('/productreport',PrderReport)
router.get('/product-sales-report',ProductSalesReport)
router.get('/product-visitor-report',ProductVisitorReport)
module.exports = router