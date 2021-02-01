import { useState, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../../context/auth-context';

import '../../../App.css';
import './styles.css';

const AdminDashboard = () => {

  const { login, setLogin } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState();
  
  const handleSubmitLoginForm = (event) => {
    event.preventDefault();
    /* const loginForm = {username, password}; */
    /* console.log(username, password); */
    /* console.log(loginForm);
    console.log("loginForm submitted"); */
      
    axios.post("http://localhost:5000/api/users/login", { username, password })
    .then(function (response) {
      /* console.log(username, password);
      console.log(response);
      console.log(response.headers);
      console.log(response.data);
      console.log(response.status); */
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
    /* const createForm = { title, description, imageUrl }; */
    /* console.log(title, description, imageFile); */

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('imageUrl', imageFile);
      console.log(formData);
      console.log(title, description, imageFile);
      const response = await axios.post("http://localhost:5000/api/projects/add-project", formData );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main> 
      {!login &&
        <div className="admin__container">
          <form onSubmit={handleSubmitLoginForm} method="POST">

            <label htmlFor="username">Nom d'utilisateur</label>
            <input 
              id="username" 
              type="text" 
              name="username" 
              value={username} 
              onChange={(event) => {
                setUsername(event.target.value);
              }} 
              required/>

            <label htmlFor="password">Mot de passe</label>
            <input 
              id="password" 
              type="password" 
              name="password" 
              value={password} 
              onChange={(event) => {
                setPassword(event.target.value);
              }} 
              required/>

            <input type="submit" value="Connexion"/>
          </form>
        </div>
      }
      
      {login && 
        <div className="admin__container">        
          <form onSubmit={handleSubmitCreateForm} method="POST" encType="multipart/form-data">
            <label htmlFor="title">Titre du projet</label>
            <input 
              id="title" 
              type="text" 
              name="title" 
              value={title} 
              onChange={(event) => {
                setTitle(event.target.value); console.log('title is : ' + title);
              }}
              required
            />

            <label htmlFor="description">Description du projet</label>
            <textarea 
              id="description" 
              name="description" 
              value={description} 
              onChange={(event) => {
                setDescription(event.target.value); console.log('description is : ' + description);
              }} 
              required
            />

            <label htmlFor="imageUrl">Description du projet</label>
            <input 
              id="imageUrl" 
              type="file" 
              name="imageUrl" 
              /* value={imageFile}  */
              onChange={/* (event) => {
                setImageFile(event.target.value);
                console.log(event.target.value, event.target.files);
              }*/ handleFileChange} 
              required
            />

            <input type="submit" value="Valider"/>
          </form>
        </div>  
      }
    </main>
  )
};

export default AdminDashboard;