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
  const [imageUrl, setImageUrl] = useState("");
  
  const handleSubmitLoginForm = (event) => {
    event.preventDefault();
    const loginForm = {username, password};
    /* console.log(username, password); */
    console.log(loginForm);
    console.log("loginForm submitted");
      
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

  const handleSubmitCreateForm = (event) => {
    event.preventDefault();
    const createForm = { title, description, imageUrl };
    console.log(createForm);
  }

  return (
    <main> 
      {!login &&
        <div className="admin__container">
          <form onSubmit={handleSubmitLoginForm} action="" method="POST">

            <label htmlFor="username">Nom d'utilisateur</label>
            <input id="username" type="text" name="username" value={username} onChange={(event) => {setUsername(event.target.value); console.log('username is : ' + username)}} required/>

            <label htmlFor="password">Mot de passe</label>
            <input id="password" type="password" name="password" value={password} onChange={(event) => {setPassword(event.target.value); console.log('password is : ' + password)}} required/>

            <input type="submit" value="Connexion"/>
          </form>
        </div>
      }
      
      {login && 
        <div className="admin__container">        
          <form onSubmit={handleSubmitCreateForm} action="" method="POST">

          <label htmlFor="title">Titre du projet</label>
          <input id="title" type="text" name="title" value={title} onChange={(event) => {setTitle(event.target.value); console.log('title is : ' + title)}}required/>

          <label htmlFor="description">Description du projet</label>
          <input id="description" type="textarea" name="description" value={description} onChange={(event) => {setDescription(event.target.value); console.log('description is : ' + description)}} required/>

          <label htmlFor="imageUrl">Description du projet</label>
          <input id="imageUrl" type="file" name="imageUrl" value={imageUrl} onChange={(event) => {setImageUrl(event.target.value); console.log('imageUrl is : ' + imageUrl)}} required/>

          <input type="submit" value="Valider"/>
          </form>
        </div>  
      }
    </main>
  )
};

export default AdminDashboard;