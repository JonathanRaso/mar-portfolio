const express = require('express');
const { check } = require('express-validator')
// TODO Create fileUpload middleware and import it here

const projectsController = require('../controllers/projectsController');

const router = express.Router();

router.get('/', projectsController.getProjects);

router.get('/:id', projectsController.getProjectById);
router.patch(
  '/:id',
  [
    check('title')
      .isLength({ min: 3 }),
    check('description')
      .isLength({ min: 15 }),  
  ],
  projectsController.updateProject);
router.delete('/:id', projectsController.deleteProject);

router.post(
  // TODO Add fileUpload middleware for image upload 
  '/add-project',
  [
    check('title')
      .isLength({ min: 3 }),
    check('description')
      .isLength({ min: 15 }), 
  ],
  projectsController.createProject); 

module.exports = router;