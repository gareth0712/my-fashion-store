const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router({ mergeParams: true });

router.route('/record').post(salesController.uploadSalesRecord);

router.route('/report').get(salesController.getAllSalesReports);

module.exports = router;
