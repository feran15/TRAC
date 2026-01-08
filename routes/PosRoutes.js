const express = require('express');
const PosController = require('../controllers/PosController');

const router = express.Router();

router.post('/AddPos', PosController.addPosAccount);


module.exports = router;