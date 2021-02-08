import React, { useState, useEffect } from 'react';
import axios from 'axios';


import HomeCard from '../home-card/index.js';
import LoadingSpinner from '../shared/loading/index.js';

import '../../App.css';
import './styles.css';

/* const HomeCard = lazy(() => import('../home-card/index.js')); */

const Home = () => {

  const [loadedProjects, setLoadedProjects] = useState(null);

  const [loading, setLoading] = useState();

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const projectsRequest = await axios.get('http://localhost:5000/api/projects');

        setLoadedProjects(projectsRequest.data.projects);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProjects();
  }, []); 


  return (
    <main>
      <div className="homepage__container">
      {loading && 
        <LoadingSpinner />
      }
      {!loading && loadedProjects && 
        loadedProjects.map((project) => {
          return ( 
            <HomeCard 
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
            />
          )
        })
      }
      </div>
    </main>
  )
};

export default Home;

/* <main className="homepage__body">
      {loadedProjects && 
        loadedProjects.map((project) => {
          return (
            <HomeCard 
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
            />
          )
        })
      }
    </main> */