import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';

import '../../App.css';
import './styles.css';

const ProjectDetails = () => {
  let { projectId } = useParams();
  const history = useHistory();

  const { login } = useContext(AuthContext);

  const [specificProject, setSpecificProject] = useState();
  const [backgroundColor, setBackgroundColor] = useState();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  /* const [editForm, setEditForm] = useState(""); */


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

  const handleSubmitEditForm = async (event) => {
    // 1 - Disable normal behaviour of form when submit
    event.preventDefault();
    /* console.log(title.length, description.length);
    console.log(specificProject.title, specificProject.description);
    console.log("Edit form submitted");
    console.log("titre : " + title, "description : " + description); */
    
    // 2 - Get data from form
    let editedTitle = title;
    let editedDescription = description;
    
    /* console.log(editedTitle, editedDescription); */

    // 2 - Check if one of the input is missing. If so, add previous data in order to send something complete to the server.
    // If not, express-validator will send 500 response because he needs a title and a description with at least 3 and 15 characters.
    if (editedTitle.length === 0) {
      editedTitle = specificProject.title;
      console.log("titre non renseigné");
    };

    if (editedDescription.length === 0) {
      editedDescription = specificProject.description;
      console.log("description non renseignée");
    };

    /* console.log("titre après if : " + editedTitle, "description après if: " + editedDescription); */


    // 3 - Async patch request to update infos inside DB and redirect admin to homepage if request successful.
    try {
      console.log(editedTitle, editedDescription);
      const response = await axios.patch(`http://localhost:5000/api/projects/${projectId}`, { title : editedTitle, description: editedDescription });
      /* const response = await axios.patch(`http://localhost:5000/api/projects/${projectId}`, { title, description }); */
      console.log(title, description);
      console.log("titre : " + editedTitle, "description : " + editedDescription)
      console.log(response);
      console.log(response.data);
      console.log(specificProject.title, specificProject.description)
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
        <div className="dashboard">
          <form onSubmit={handleSubmitEditForm} method="POST">

            <label htmlFor="title">Titre</label>
            <input 
              id="title" 
              type="text" 
              name="title" 
              value={title}
              placeholder="3 caractères min"
              onChange={(event) => {
                setTitle(event.target.value);
                console.log('edited title is : ' + title)
              }}
            />

            <label htmlFor="description">Description</label>
            <textarea 
              id="description" 
              type="text" 
              name="description" 
              value={description}
              placeholder="15 caractères min" 
              onChange={(event) => {
                setDescription(event.target.value);
                console.log('edited description is : ' + description)
              }} 
            />

            <input className="dashboard__button" type="submit" value="Modifier ce projet"/>
          </form>
          <input className="dashboard__button" type="button" onClick={handleDeleteButton} value="Supprimer ce projet" />
        </div>
      }

      <div className={`project__picture project__picture--${backgroundColor}`}>
        {specificProject &&
        <>
          <img src={`http://localhost:5000/${specificProject.imageUrl}`} alt={specificProject.title}/>
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