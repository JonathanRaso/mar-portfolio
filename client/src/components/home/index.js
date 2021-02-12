import React, { useState, useEffect } from 'react';
import axios from 'axios';

import HomeCard from '../home-card/index.js';
import LoadingSpinner from '../shared/loading/index.js';

import '../../App.css';
import './styles.css';

const Home = () => {

  const [loadedProjects, setLoadedProjects] = useState(null);

  const [loading, setLoading] = useState();

  // useEffect for fetching all projects when page load for first time.
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const projectsRequest = await axios.get(process.env.REACT_APP_BACKEND_URL + '/projects');
        setLoadedProjects(projectsRequest.data.projects);
        setLoading(false);
      } catch (err) {
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