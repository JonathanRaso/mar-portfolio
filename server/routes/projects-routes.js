const express = require('express');
const { check } = require('express-validator')

const projectsController = require('../controllers/projectsController');
const router = express.Router();

router.get('/', projectsController.getProjects);

router.get('/:id', projectsController.getProjectById);
router.patch('/:id', projectsController.updateProject);
router.delete('/:id', projectsController.deleteProject);

router.post(
  '/add-project',
  [
    check('title')
      .isLength({ min: 3 }),
    check('description')
      .isLength({ min: 15 }), 
  ],
  projectsController.createProject);

module.exports = router;