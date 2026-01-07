const express = require('express');
const router = express.Router();
const CalculationController = require('../Controllers/CalculationController');

/**
 * @openapi
 * tags:
 *   - name: Calculations
 *     description: Transaction calculations and history
 */

/**
 * @openapi
 * /api/calc/transactions/calculate:
 *   get:
 *     tags:
 *       - Calculations
 *     summary: Calculate transaction totals
 *     responses:
 *       200:
 *         description: Totals result
 */
router.get('/transactions/calculate', CalculationController.calculateTotals);

/**
 * @openapi
 * /api/calc/transactions/history:
 *   get:
 *     tags:
 *       - Calculations
 *     summary: Get transaction history
 *     responses:
 *       200:
 *         description: Transaction history
 */
router.get('/transactions/history', CalculationController.getTransactionHistory);

module.exports = router;
