import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from '../../context/auth-context';

import '../../../App.css';
import './styles.css';

const AdminDashboard = () => {

  const { login, setLogin } = useContext(AuthContext);

  const history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState();
  
  const handleSubmitLoginForm = (event) => {
    event.preventDefault();
      
    /* TODO ==> Replace .then.catch with async try and catch */
    axios.post("http://localhost:5000/api/users/login", { username, password })
    .then(function (response) {
      setLogin(true);
    })
    .catch(function (error) {
      console.log(error);
    });  
  }

  const handleFileChange = (event) => {
    setImageFile(event.target.files[0]);
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
    } catch (error) {
      console.log(error);
    }
    /* TODO ==> Redirect only if creation is successful (201). */
    history.push('/');

  }

  return (
    <main> 
      <div className="admin__container">
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

              <label className="dashboard__label" htmlFor="imageUrl">Choisir une image</label>
              <input
                className="dashboard__input" 
                id="imageUrl" 
                type="file" 
                name="imageUrl" 
                onChange={handleFileChange} 
                required
              />

              <input className="dashboard__button" type="submit" value="Valider"/>
            </form>
          </div>  
        }
      </div>
    </main>
  )
};

export default AdminDashboard;