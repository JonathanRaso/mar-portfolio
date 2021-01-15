import { useParams } from 'react-router-dom';

import '../../App.css';
import './styles.css';

const ProjectDetails = () => {
  let { projectId } = useParams();

  return (
    <main className="main__height project__body">
      <h2> Project id = { projectId } </h2>
    </main>
  )
};

export default ProjectDetails;