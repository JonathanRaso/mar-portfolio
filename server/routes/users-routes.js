const express = require('express');
// TODO Create fileUpload middleware and import it here

const userController = require('../controllers/userController');

const router = express.Router();

router.post('/login', userController.userLogin);

module.exports = router;