import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import '../../App.css';
import './styles.css';

const ProjectDetails = () => {
  let { projectId } = useParams();

  const [specificProject, setSpecificProject] = useState();
  const [backgroundColor, setBackgroundColor] = useState();

  useEffect(() => {
    const randomColors = ['first', 'second', 'third', 'fourth'];
    const backgroundInfoColor = (colorsArray) => {
      setBackgroundColor(colorsArray[Math.floor(Math.random() * colorsArray.length)]);
    };
    backgroundInfoColor(randomColors);
    console.log('result: ' + backgroundColor);
  }, [backgroundColor]);

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
      <div className="project__picture">
        {specificProject &&
        <>
          <img src="https://source.unsplash.com/random" alt=""/>
        </> 
        }
      </div>
      <div className={`project__info project__info--${backgroundColor}`}>
        {specificProject &&
        <>
          <h2>{specificProject.title}</h2>
          <p>{specificProject.description}</p>
        </> 
        }
      </div>
    </main>
  )
};

export default ProjectDetails;