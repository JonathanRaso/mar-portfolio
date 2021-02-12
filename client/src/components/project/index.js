import { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../context/auth-context';
import NoMatch from '../shared/404';
import LoadingSpinner from '../shared/loading/index';

import '../../App.css';
import './styles.css';

const ProjectDetails = () => {
  // Getting id of the project with useParams()
  let { projectId } = useParams();
  const history = useHistory();

  const { login } = useContext(AuthContext);

  // Setting specific project data
  const [specificProject, setSpecificProject] = useState();

  // Setting random background color
  const [backgroundColor, setBackgroundColor] = useState();

  // Setting title and description of the project (for editing)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Display error/success message
  const [creationResult, setCreationResult] = useState("");

  // Loading before specific project data
  const [preLoading, setPreLoading] = useState();

  // Loading for edit/delete http request
  const [loading, setLoading] = useState(false);

  const handleDeleteButton = async () => {
    // Set loading == true during delete request
    setLoading(true);

    // Try deleting project. If successful, display success message and redirect
    // If unsuccessful, display error message
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}`);
      setLoading(false);
      setCreationResult("Suppression réussie!");
      setTimeout(() => {
        setCreationResult("");
        history.push('/');
      }, 3000);

    } catch (error) {
      setLoading(false);
      setCreationResult("La suppression a échoué, veuillez recommencer.");
    }
  }

  const handleSubmitEditForm = async (event) => {
    // 1 - Disable normal behaviour of form when submit
    event.preventDefault();
    setLoading(true);
    
    // 2 - Get data from form
    let editedTitle = title;
    let editedDescription = description;

    // 3 - Check if one of the input is missing. If so, add previous data in order to send something complete to the server.
    // If not, express-validator will send 500 response because he needs a title and a description with at least 3 and 15 characters.
    if (editedTitle.length === 0) {
      editedTitle = specificProject.title;
    };

    if (editedDescription.length === 0) {
      editedDescription = specificProject.description;
    };

    // 4 - Async patch request to update infos inside DB and redirect admin to homepage if request successful.
    try {
      await axios.patch(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}`, { title : editedTitle, description: editedDescription });
      setLoading(false);
      setCreationResult("Modification réussie!");

      setTimeout(() => {
        setCreationResult("");
        history.push('/');
      }, 3000);

    } catch (error) {
      setLoading(false);
      setCreationResult("La modification a échoué, veuillez recommencer.");
    }
  }

  // useEffect for random background color.
  useEffect(() => {
    const randomColors = ['first', 'second', 'third', 'fourth'];
    const backgroundInfoColor = (colorsArray) => {
      setBackgroundColor(colorsArray[Math.floor(Math.random() * colorsArray.length)]);
    };
    backgroundInfoColor(randomColors);
  }, [backgroundColor]);

  // useEffect for fetching specific project data, using projectId to know which one to fetch.
  useEffect(() => {
    const fetchSpecificProject = async () => {
      setPreLoading(true);
      try {
        const projectData = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}`);
        setSpecificProject(projectData.data.project);
        setPreLoading(false);
      } catch (err) {
        setPreLoading(false);
      }
    }

    fetchSpecificProject();
  }, [projectId]);

  return (
    <>
    <main>
    <div className="project__container">
    {preLoading && 
      <LoadingSpinner />
    }
    {!preLoading && !specificProject && <NoMatch />}
      {login && 
        <div className="admin__form">
        {loading && 
          <LoadingSpinner />
        }   
        {creationResult &&
          <span className="dashboard__message">{creationResult}</span>
        }
            <form className="admin__edit" onSubmit={handleSubmitEditForm} method="POST">

              <label className="admin__label" htmlFor="title">Titre</label>
              <input 
                className="admin__input"
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

              <label className="admin__label" htmlFor="description">Description</label>
              <textarea 
                className="admin__textarea"
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

              <input className="admin__button" type="submit" value="Modifier ce projet"/>
            </form>
            <input className="admin__button" type="button" onClick={handleDeleteButton} value="Supprimer ce projet" />
          </div>
      }

      {!preLoading && specificProject &&
      <>
        <div className={`project__picture project__picture--${backgroundColor}`}>
          {specificProject &&
          <>
            <img src={`${process.env.REACT_APP_ASSET_URL}/${specificProject.imageUrl}`} alt={specificProject.title}/>
          </>
          }
        </div>
        <div className={`project__info project__info--${backgroundColor}`}>
          {specificProject &&
          <>
            <h2 className="project__info--title">{specificProject.title}</h2>
            <p className="project__info--description">{specificProject.description}</p>
          </> 
          }
        </div>
      </>
      }
      </div>
    </main>
    </>
  )
};

export default ProjectDetails;