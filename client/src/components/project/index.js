import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';

import '../../App.css';
import './styles.css';

const ProjectDetails = () => {
  let { projectId } = useParams();
  let history = useHistory();

  const { login } = useContext(AuthContext);

  const [specificProject, setSpecificProject] = useState();
  const [backgroundColor, setBackgroundColor] = useState();

  const handleDeleteButton = async () => {
    /* console.log("suppression du projet numéro" + projectId); */
    try {
      await axios.delete(`http://localhost:5000/api/projects/${projectId}`);
      console.log("Projet supprimé!");
    } catch (error) {
      console.log(error);
    }
    return history.push("/");
  }

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
    <main className="project__body">
      {login && 
        <div>
          <button onClick={handleDeleteButton}>Supprimer ce projet</button>
          <button onClick={() => console.log('Projet modifié')}>Valider changement</button>
        </div>
      }

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
          <p className="project__info--description">{specificProject.description}. Minima quasi iste nobis unde adipisci totam ullam quaerat! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure, eaque ipsa? Nam, atque? Saepe facilis sequi architecto? Assumenda quae ullam consectetur dolore aut nihil aperiam minima omnis, commodi, aliquam perferendis!</p>
        </> 
        }
      </div>
    </main>
  )
};

export default ProjectDetails;