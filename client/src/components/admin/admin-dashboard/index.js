import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../context/auth-context';

import LoadingSpinner from '../../shared/loading/index';

import '../../../App.css';
import './styles.css';

const AdminDashboard = () => {

  // Getting login value (true or false) from context hook
  const { login, setLogin } = useContext(AuthContext);

  // Used for redirecting admin.
  const history = useHistory();

  // Display Loading Spinner if loading == true;
  const [loading, setLoading] = useState(false);

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Create form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState();

  // Display file name before form submit
  const [fileName, setFileName] = useState("");

  // Display error/success message
  const [creationResult, setCreationResult] = useState("");

  const handleSubmitLoginForm = async (event) => {
    // Prevent submit default behaviour and set loading to true
    event.preventDefault();
    setLoading(true); 
    
    // Send username/password to backend and change login/loading state if request successful or not
    try {
      await axios.post(process.env.REACT_APP_BACKEND_URL + '/users/login', { username, password });
      setLogin(true);
      setLoading(false);
      setCreationResult("");
    } catch (error) {
      setLoading(false);
      setCreationResult("La connexion a échoué, veuillez recommencer.");
    }  
  }

  const handleFileChange = (event) => {
    // set imageFile value and get file name to display on creation form
    setImageFile(event.target.files[0]);
    setFileName(event.target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]);
  }

  const handleSubmitCreateForm = async (event) => {

    // Prevent submit default behaviour and set loading to true
    event.preventDefault();
    setLoading(true);

    try {
      // Add data sent by client to formData.
      // Send post request with data.
      // If successful, display message and redirect to homepage
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('imageUrl', imageFile);
      await axios.post(process.env.REACT_APP_BACKEND_URL + '/projects/add-project', formData );
      setLoading(false);
      setCreationResult("Création du projet réussie! Redirection en cours.");

      setTimeout(() => {
        setCreationResult("");
        history.push('/');
      }, 3000);

    } catch (error) {
      // If unsuccessful, display error message.
      setLoading(false);
      setCreationResult("La création du projet a échoué, veuillez recommencer.");
    }

  }

  return (
    <main> 
      <div className="admin__container">
        {creationResult &&
          <span className="dashboard__message">{creationResult}</span>
        }
        {!login &&
          <div className="dashboard__form">
            {!loading && 
              <form className="dashboard__login" onSubmit={handleSubmitLoginForm} method="POST">

              <label className="dashboard__label" htmlFor="username">Nom d'utilisateur</label>
              <input 
                className="dashboard__input"
                id="username" 
                type="text" 
                name="username" 
                value={username} 
                onChange={(event) => {
                  setUsername(event.target.value);
                }} 
                required/>

              <label className="dashboard__label" htmlFor="password">Mot de passe</label>
              <input 
                className="dashboard__input"
                id="password" 
                type="password" 
                name="password" 
                value={password} 
                onChange={(event) => {
                  setPassword(event.target.value);
                }} 
                required/>

              <input className="dashboard__button" type="submit" value="Connexion"/>
            </form>
            }  
            {loading && 
              <LoadingSpinner />  
            }
          </div>
        }
        
        {login && 
          <div className="dashboard__form">  
            {!loading && 
              <form className="dashboard__creation" onSubmit={handleSubmitCreateForm} method="POST" encType="multipart/form-data">

              <label className="dashboard__label" htmlFor="title">Titre du projet</label>
              <input 
                className="dashboard__input"
                id="title" 
                type="text" 
                name="title"
                placeholder="3 caractères min" 
                value={title} 
                onChange={(event) => {
                  setTitle(event.target.value); console.log('title is : ' + title);
                }}
                required
              />

              <label className="dashboard__label" htmlFor="description">Description du projet</label>
              <textarea
                className="dashboard__textarea" 
                id="description" 
                name="description"
                placeholder="15 caractères min" 
                value={description} 
                onChange={(event) => {
                  setDescription(event.target.value); console.log('description is : ' + description);
                }} 
                required
              />

              <label className="dashboard__label--file" htmlFor="imageUrl">Choisir une image</label>
              <input
                className="dashboard__input" 
                id="imageUrl" 
                type="file" 
                name="imageUrl" 
                onChange={handleFileChange} 
                required
                hidden
              />
              <span className="dashboard__filename">{fileName ? fileName : "Aucun fichier choisi!" }</span>

              <input className="dashboard__button" type="submit" value="Valider"/>
            </form>
            }      
            {loading && 
              <LoadingSpinner />  
            }
          </div>  
        }
      </div>
    </main>
  )
};

export default AdminDashboard;