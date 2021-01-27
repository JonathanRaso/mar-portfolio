import { useState } from 'react';
import axios from 'axios';

import '../../../App.css';
import './styles.css';

const AdminDashboard = () => {

  /* const [formValue, setFormValue] = useState({}); */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const form = {username, password};
    console.log(form);
    console.log("Form submitted");

    /* axios.post("http://localhost:5000/api/users/login")
      .then(console.log(Response)) */
      
      axios.post("http://localhost:5000/api/users/login", { username, password })
      .then(function (response) {
        console.log(username, password);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });  
    /* setFormValue({[event.target.name]: [event.target.value]}); */
    /* console.log(formValue); */
    /* console.log(event.target, event.target.value);
    console.log(formValue);
    setFormValue({})
    console.log(username, password); */
    /* setPassword() */
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
      </div>
    </main>
  )
};

export default AdminDashboard;