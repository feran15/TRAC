const express = require('express');
const router = express.Router();
const PosController = require('../controllers/PosController');

router.post('/users/:id/addPos', PosController.addPosAccount);

module.exports = router;
