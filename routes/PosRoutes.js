const express = require('express');
const PosController = require('../controllers/PosController');

const router = express.Router();

router.post('/AddPos', PosController.addPosAccount);
router.get('/users/:id/pos', PosController.getAllPosAccounts);
router.get('/users/:id/pos/:posId', PosController.getSinglePosAccount);
router.put('/users/:id/pos/:posId', PosController.updatePosAccount);
router.delete('/users/:id/pos/:posId', PosController.deletePosAccount);

module.exports = router;