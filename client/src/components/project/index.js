import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  let { projectId } = useParams();

  return (
    <div>
      <h2> Project id = { projectId } </h2>
    </div>
  )
};

export default ProjectDetails;