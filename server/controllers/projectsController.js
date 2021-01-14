const { validationResult } = require('express-validator');

const Project = require('../models/project');

const getProjects = async (req, res, next) => {
  
  let projects;
  try {
    projects = await Project.find();
  } catch (err) {
    return console.log(err);
  }
  // console.log(projects);

  res.status(200).json({ projects: projects.map(project => project.toObject({ getters: true })) });
};

const getProjectById = async (req, res, next) => {
  console.log('Fetching project by id', req.params);
  const projectId = req.params.id;

  let project;
  try {
    project = await Project.findById({ _id : projectId });
  } catch (err) {
    return console.log(err);
  }

  if (!project) {
    console.log('This place cannot be found');
    return next();
  }

  res.status(200).json({ project: project.toObject({ getters: true }) });
};

const createProject = async (req, res, next) => {
  // Look into the request object and see if there are any validations error based on the config inside projects-routes.js
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return console.log('Invalid inputs passed, please check your data');
  }
  
  const projectData = req.body;
  // console.log(projectData);
  const { title, description, imageUrl } = projectData;
  // console.log(title, description, imageUrl);

  const createdProject = new Project({
    title,
    description,
    imageUrl
  });
  // console.log(createdProject);

  try {
    await createdProject.save();
  } catch (err) {
    return console.log(err);
  }

  res.status(201).json({ message: "Project has been added!" })
}

const updateProject = async (req, res, next) => {
  // 1 - get id of the project with req.params
  const projectId = req.params.id;
  console.log(projectId);

  // 2 - update project with new data
  try {
    await Project.findByIdAndUpdate(projectId, req.body);
  } catch (err) {
    return console.log(err);
  }
  
  // 3 - send response
  res.status(200).json({ message: "Project has been updated" });
}

const deleteProject = async (req, res, next) => {
  const projectId = req.params.id;
  console.log(projectId);

  let project;

  try {
    project = await Project.findByIdAndDelete(projectId);
  } catch (err) {
    return console.log(err)
  }

  if (!project) {
    console.log('This place cannot be found');
    return next();
  }

  TODO: // Handle uploaded file link to this project (erase uploaded picture) 

  res.status(200).json({ message: 'Project correctly deleted.' });
}

exports.getProjects = getProjects;
exports.getProjectById = getProjectById;
exports.createProject = createProject;
exports.updateProject = updateProject;
exports.deleteProject = deleteProject;