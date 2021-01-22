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
    <main className={`main__height project__body`}>
      <div className={`project__picture project__picture--${backgroundColor}`}>
        {specificProject &&
        <>
          <img src="https://source.unsplash.com/random" alt=""/>
        </> 
        }
      </div>
      <div className={`project__info project__info--${backgroundColor}`}>
        {specificProject &&
        <>
          <h2 className="project__info--title">{specificProject.title}</h2>
          <p className="project__info--description">{specificProject.description} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed quisquam, tenetur, ab temporibus deserunt aspernatur optio consequuntur dolor quos, possimus modi. Minima quasi iste nobis unde adipisci totam ullam quaerat! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, eaque ipsa? Nam, atque? Saepe facilis sequi architecto? Assumenda quae ullam consectetur dolore aut nihil aperiam minima omnis, commodi, aliquam perferendis!</p>
        </> 
        }
      </div>
    </main>
  )
};

export default ProjectDetails;