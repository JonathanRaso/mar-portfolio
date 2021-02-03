const fs = require('fs');

const { validationResult } = require('express-validator');

const Project = require('../models/project');

const getProjects = async (req, res, next) => {
  
  let projects;
  try {
    projects = await Project.find();
  } catch (err) {
    return next(new Error("Cannot find projects"));
  }

  res.status(200).json({ projects: projects.map(project => project.toObject({ getters: true })) });
};

const getProjectById = async (req, res, next) => {
  console.log('Fetching project by id', req.params);
  const projectId = req.params.id;

  let project;
  try {
    project = await Project.findById({ _id : projectId });
  } catch (err) {
    return next(new Error("Cannot find this specific project"));
  }

  res.status(200).json({ project: project.toObject({ getters: true }) });
};

const createProject = async (req, res, next) => {
  // Look into the request object and see if there are any validations error based on the config inside projects-routes.js
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new Error ('Invalid inputs passed, please check your data'));
  }
  
  console.log(req.file);
  const projectData = req.body;
  const { title, description } = projectData;

  const createdProject = new Project({
    title,
    description,
    imageUrl: req.file.path,
  });
  console.log(createdProject);

  /* if (!createdProject.title.length < 3 || !createdProject.description.length < 15 || !createdProject.imageUrl) {
    console.log('ERROR = input missing');
    return next(new Error('Vous devez renseigner tous les champs pour créer un projet.'));
  } */

  try {
    await createdProject.save();
  } catch (err) {
    return next(err);
  }

  res.status(201).json({ message: "Le projet a bien été créé !" })
}

const updateProject = async (req, res, next) => {
  // Look into the request object and see if there are any validations error based on the config inside projects-routes.js
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid inputs passed, please check your data");
    return next(error);
  }

  // 1 - get id of the project with req.params
  const projectId = req.params.id;
  console.log(req.body);

  // 2 - Check if this id exists inside db
  let project;
  try {
    project = await Project.findById(projectId);
  } catch (err) {
    return next(err);
  }

  if (!project) {
    const error = new Error("This project doesn't exist");
    return next(error);
  }

  // 3 - update project with new data if it exists
  try {
    await Project.findByIdAndUpdate(projectId, req.body);
    /* console.log(req.body); */
  } catch (err) {
    const error = new Error("Can't update data");
    error.status = 500;
    return next(error);
  }
  
  // 4 - send response
  res.status(200).json({ message: "Project has been updated" });
}

const deleteProject = async (req, res, next) => {
  const projectId = req.params.id;

  let project;
  try {
    project = await Project.findByIdAndDelete(projectId);
    console.log(project);
  } catch (err) {
    return next(err);
  }

  if (!project) {
    const error = new Error("This place cannot be found");
    error.status = 404;
    return next(error);
  }

  TODO: // Test if the picture is only removed when deleteProject is successful
  fs.unlink(project.imageUrl, (err) => {
    if (err) throw err;
    console.log('The file was deleted!')
  })

  res.status(200).json({ message: 'Project correctly deleted.' });
}

exports.getProjects = getProjects;
exports.getProjectById = getProjectById;
exports.createProject = createProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;