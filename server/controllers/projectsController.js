const fs = require('fs');

const { validationResult } = require('express-validator');

const Project = require('../models/project');

const getProjects = async (req, res, next) => {
  
  let projects;
  try {
    projects = await Project.find();
  } catch (err) {
    return next(new Error("Projets introuvables."));
  }

  res.status(200).json({ projects: projects.map(project => project.toObject({ getters: true })) });
};

const getProjectById = async (req, res, next) => {
  const projectId = req.params.id;

  let project;
  try {
    project = await Project.findById({ _id : projectId });
  } catch (err) {
    return next(new Error("Ce projet n'a pas été trouvé."));
  }

  res.status(200).json({ project: project.toObject({ getters: true }) });
};

const createProject = async (req, res, next) => {
  // Look into the request object and see if there are any validations error based on the config inside projects-routes.js
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(new Error ('Données renseignées invalides.'));
  }
  
  const projectData = req.body;
  const { title, description } = projectData;

  const createdProject = new Project({
    title,
    description,
    imageUrl: req.file.path,
  });

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
    const error = new Error("Données renseignées invalides.");
    return next(error);
  }

  // 1 - get id of the project with req.params
  const projectId = req.params.id;

  // 2 - Check if this id exists inside db
  let project;
  try {
    project = await Project.findById(projectId);
  } catch (err) {
    return next(err);
  }

  if (!project) {
    const error = new Error("Ce projet est introuvable.");
    return next(error);
  }

  // 3 - update project with new data if it exists
  try {
    await Project.findByIdAndUpdate(projectId, req.body);
  } catch (err) {
    const error = new Error("Modification impossible, veuillez réessayer");
    error.status = 500;
    return next(error);
  }
  
  // 4 - send response
  res.status(200).json({ message: "Le projet a été modifié." });
}

const deleteProject = async (req, res, next) => {
  const projectId = req.params.id;

  let project;
  try {
    project = await Project.findByIdAndDelete(projectId);
  } catch (err) {
    return next(err);
  }

  if (!project) {
    const error = new Error("Ce projet est impossible à trouver");
    error.status = 404;
    return next(error);
  }

  fs.unlink(project.imageUrl, (err) => {
    if (err) throw err;
  })

  res.status(200).json({ message: 'Projet supprimé avec succès.' });
}

exports.getProjects = getProjects;
exports.getProjectById = getProjectById;
exports.createProject = createProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;