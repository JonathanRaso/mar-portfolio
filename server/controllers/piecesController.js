const Project = require('../models/project');

const getPieces = async (req, res, next) => {
  
  let projects;
  try {
    projects = await Project.find({});

  } catch (err) {
    return console.log(err);
  }
  console.log(projects);

  res.status(200).json({ projects: projects.map(project => project.toObject({ getters: true })) });
};

exports.getPieces = getPieces;