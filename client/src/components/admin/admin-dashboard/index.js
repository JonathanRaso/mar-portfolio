import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../context/auth-context';

import '../../../App.css';
import './styles.css';

const AdminDashboard = () => {

  const { login, setLogin } = useContext(AuthContext);

  const history = useHistory();

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
  
  const handleSubmitLoginForm = (event) => {
    event.preventDefault();
      
    /* TODO ==> Replace .then.catch with async try and catch */
    axios.post("http://localhost:5000/api/users/login", { username, password })
    .then(function (response) {
      setLogin(true);
      setCreationResult("");
    })
    .catch(function (error) {
      console.log(error);
      setCreationResult("La connexion a échoué, veuillez recommencer.");
    });  
  }

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
    setFileName(event.target.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]);
  }

  const handleSubmitCreateForm = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('imageUrl', imageFile);
      const response = await axios.post("http://localhost:5000/api/projects/add-project", formData );
      /* TODO ==> Remove console.log(response) */
      console.log(response);
      console.log(response.status);
      console.log(response.data.message);
      setCreationResult("Création du projet réussie! Redirection en cours.");

      setTimeout(() => {
        setCreationResult("");
        history.push('/');
      }, 3500);

    } catch (error) {
      console.log(error);
      console.log(error.message);
      setCreationResult("La création du projet a échoué, veuillez recommencer.");
    }
    /* TODO ==> Redirect only if creation is successful (201). */
    /* history.push('/'); */
    /* setTimeout(() => {
      setCreationResult("");
      history.push('/');
    }, 3500); */


  }

  return (
    <main> 
      <div className="admin__container">
        {creationResult &&
          <span className="dashboard__message">{creationResult}</span>
        }
        {!login &&
          <div className="dashboard__form">  
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
          </div>
        }
        
        {login && 
          <div className="dashboard__form">        
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
          </div>  
        }
      </div>
    </main>
  )
};

export default AdminDashboard;