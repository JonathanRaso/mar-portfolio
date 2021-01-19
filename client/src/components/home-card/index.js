import { Link } from 'react-router-dom';

import './styles.css';

const HomeCard = ({id, title, description, imageUrl}) => {
  return (
    <Link to={`/${id}`} className="card__test">
      <div key={`${id}`}>
        <h3>{`${id}`}</h3>
        <h3>{`${title}`}</h3>
        <h3>{`${description}`}</h3>
        <h3>{`${imageUrl}`}</h3>
      </div>
    </Link>
  )
}

export default HomeCard;