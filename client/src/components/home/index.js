import { useState, useEffect } from 'react';
import axios from 'axios';

import HomeCard from '../home-card/index.js';

import '../../App.css';
import './styles.css';

const Home = () => {

  const [loadedProjects, setLoadedProjects] = useState();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsRequest = await axios.get('http://localhost:5000/api/projects');

        setLoadedProjects(projectsRequest.data.projects);
      } catch (err) {
        console.log(err)
      }
    };
    fetchProjects();
  }, []); 

  return (
    <main>
      <div className="homepage__container">
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