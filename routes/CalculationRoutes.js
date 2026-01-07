const express = require('express');
const router = express.Router();
const CalculationController = require('../Controllers/CalculationController');

router.get('/transactions/calculate', CalculationController.calculateTotals);
router.get('/transactions/history', CalculationController.getTransactionHistory);

module.exports = router;
