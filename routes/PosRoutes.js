const express = require('express');
const PosController = require('../controllers/PosController');

const router = express.Router();

/**
 * @openapi
 * tags:
 *   - name: POS
 *     description: POS account management
 */

/**
 * @openapi
 * /api/Pos/AddPos:
 *   post:
 *     tags:
 *       - POS
 *     summary: Add POS account to a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               provider:
 *                 type: string
 *               terminalId:
 *                 type: string
 *               name:
 *                 type: string
 *               apiKey:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: POS account added
 */
router.post('/AddPos', PosController.addPosAccount);

/**
 * @openapi
 * /api/Pos/users/{id}/pos:
 *   get:
 *     tags:
 *       - POS
 *     summary: Get all POS accounts for a user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Array of pos accounts
 */
router.get('/users/:id/pos', PosController.getAllPosAccounts);

/**
 * @openapi
 * /api/Pos/users/{id}/pos/{posId}:
 *   get:
 *     tags:
 *       - POS
 *     summary: Get single POS account
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: posId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Single pos account
 */
router.get('/users/:id/pos/:posId', PosController.getSinglePosAccount);

/**
 * @openapi
 * /api/Pos/users/{id}/pos/{posId}:
 *   put:
 *     tags:
 *       - POS
 *     summary: Update a POS account
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: posId
 *         schema:
 *           type: string
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Updated pos account
 */
router.put('/users/:id/pos/:posId', PosController.updatePosAccount);

/**
 * @openapi
 * /api/Pos/users/{id}/pos/{posId}:
 *   delete:
 *     tags:
 *       - POS
 *     summary: Delete a POS account
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *       - in: path
 *         name: posId
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Deleted pos account
 */
router.delete('/users/:id/pos/:posId', PosController.deletePosAccount);

module.exports = router;