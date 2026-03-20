const express = require('express');
const PosController = require('../Controllers/PosController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/AddPos', authenticateToken, PosController.addPosAccount);
router.post('/AddPos/:id', authenticateToken, PosController.addPosAccount);


module.exports = router;