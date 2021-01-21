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
            className="card__body__image"
          />
          <div className="card__overlay">
            <h3 className="card__overlay__title">{`${title}`}</h3>
            <p className="card__overlay__description">{`${description}`}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default HomeCard;