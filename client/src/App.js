import { useState, useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/shared/navbar/index.js';
import Home from './components/home/index.js';
import Infos from './components/infos/index.js';
import ProjectDetails from './components/project/index.js';
import NoMatch from './components/shared/404';

import AdminDashboard from './components/admin/admin-dashboard/index.js';

import { AuthContext } from './components/context/auth-context';


import './App.css';

function App() {
  const [login, setLogin] = useState(false);

  const isLogged = useMemo(() => ({ login, setLogin }), [login, setLogin]);

  /*TODO ==> add errorMessage to context api*/
  /* const [creationResult, setCreationResult] = useState("test");
  const errorMessage = useMemo(() => ({ creationResult, setCreationResult }), [creationResult, setCreationResult]); */

  return (
    <AuthContext.Provider value={isLogged}>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/infos">
            <Infos />
          </Route>
          <Route exact path="/admin">
            <AdminDashboard />
          </Route>
          <Route exact path="/:projectId">
            <ProjectDetails />
          </Route>
          <Route>
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </AuthContext.Provider>  
  );
}

export default App;
