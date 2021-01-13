const Project = require('../models/project');

const getProjects = async (req, res, next) => {
  
  let projects;
  try {
    projects = await Project.find({});
  } catch (err) {
    return console.log(err);
  }
  console.log(projects);

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

exports.getProjects = getProjects;
exports.getProjectById = getProjectById;