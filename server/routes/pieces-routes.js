const express = require('express');

const piecesController = require('../controllers/piecesController');
const router = express.Router();

router.get('/', piecesController.getPieces);

module.exports = router;