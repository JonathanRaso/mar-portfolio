const express = require('express');

const projectsController = require('../controllers/projectsController');
const router = express.Router();

router.get('/', projectsController.getProjects);
router.get('/:id', projectsController.getProjectById);

module.exports = router;