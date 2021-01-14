const express = require('express');

const projectsController = require('../controllers/projectsController');
const router = express.Router();

router.get('/', projectsController.getProjects);
router.get('/:id', projectsController.getProjectById);

router.post('/add-project', projectsController.createProject);

router.delete('/:id', projectsController.deleteProject);

module.exports = router;