import { Link } from 'react-router-dom';

import './styles.css';

const HomeCard = ({id, title, description, imageUrl}) => {

  return (
    <div className="card__container">
      <Link to={`/${id}`}>
        <div key={`${id}`} className="card__body">
          <img 
            src="https://source.unsplash.com/random" 
            alt=""
            className="card__body--image"
          />
          <div className="card__overlay">
            <h2 className="card__overlay--title">{`${title}`}</h2>
            <p className="card__overlay--description">{`${description}`}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default HomeCard;