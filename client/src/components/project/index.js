import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import '../../App.css';
import './styles.css';

const ProjectDetails = () => {
  let { projectId } = useParams();

  const [specificProject, setSpecificProject] = useState();

  useEffect(() => {
    const fetchSpecificProject = async () => {
      try {
        const projectData = await axios.get(`http://localhost:5000/api/projects/${projectId}`);

        setSpecificProject(projectData.data.project);
      } catch (err) {
        console.log(err);
      }
    }
    fetchSpecificProject();
  }, [projectId]);

  return (
    <main className="main__height project__body">
      <h2> Project id = { projectId } </h2>
      {specificProject &&
      <>
        <h3>{specificProject.id}</h3>
        <h3>{specificProject.title}</h3>
        <h3>{specificProject.description}</h3>
        <h3>{specificProject.imageUrl}</h3>
      </> 
      }
    </main>
  )
};

export default ProjectDetails;