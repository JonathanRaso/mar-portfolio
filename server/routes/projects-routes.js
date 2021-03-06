const express = require('express');
const { check } = require('express-validator');

const fileUpload = require('../middleware/file-upload');

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
  '/add-project',
  fileUpload.single('imageUrl'),
  [
    check('title')
      .isLength({ min: 3 }),
    check('description')
      .isLength({ min: 15 }), 
  ],
  projectsController.createProject); 

module.exports = router;