import { useState, useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './components/shared/navbar/index.js';
import Home from './components/home/index.js';
import Infos from './components/infos/index.js';
import ProjectDetails from './components/project/index.js';

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
          <Route path="/infos" exact>
            <Infos />
          </Route>
          <Route path="/admin" exact>
            <AdminDashboard />
          </Route>
          {/* <Route path="/admin" exact>
            <AdminDashboard />
          </Route> */}
          <Route path="/:projectId">
            <ProjectDetails />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </AuthContext.Provider>  
  );
}

export default App;
