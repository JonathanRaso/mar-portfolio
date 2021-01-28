import { useState, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from '../../context/auth-context';

import '../../../App.css';
import './styles.css';

const AdminDashboard = () => {

  const { login, setLogin } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const form = {username, password};
    console.log(form);
    console.log(login);
    console.log("Form submitted");
      
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

  return (
    <main>
      <div className="admin__container">
        <form onSubmit={handleSubmitForm} action="" method="POST">

          <label htmlFor="username">Nom d'utilisateur</label>
          <input id="username" type="text" name="username" value={username} onChange={(event) => {setUsername(event.target.value); console.log('username is : ' + username)}} required/>

          <label htmlFor="password">Mot de passe</label>
          <input id="password" type="password" name="password" value={password} onChange={(event) => {setPassword(event.target.value); console.log('password is : ' + password)}} required/>

          <input type="submit" value="Connexion"/>
        </form>
        <p>{login}</p>
        {login && <p>Tu es connecté</p>}
        <button onClick={() => {setLogin('log'); console.log(login)}}>Change Value</button>
      </div>
    </main>
  )
};

export default AdminDashboard;