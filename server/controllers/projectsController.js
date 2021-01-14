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

const createProject = async (req, res, next) => {
  const projectData = req.body;
  console.log(projectData);
  const { title, description, imageUrl } = projectData;
  console.log(title, description, imageUrl);

  const createdProject = new Project({
    title,
    description,
    imageUrl
  });
  console.log(createdProject);


  try {
    await createdProject.save();
  } catch (err) {
    return console.log(err);
  }

  res.status(201).json({ message: "Project has been added!" })
}

const editProject = async (req, res, next) => {
  TODO
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

  TODO: // Handle uploaded file link to this project (erase picture uploaded)

  res.status(200).json({ message: 'Project correctly deleted.' });
}

exports.getProjects = getProjects;
exports.getProjectById = getProjectById;
exports.createProject = createProject;
exports.editProject = editProject;
exports.deleteProject = deleteProject;