import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './styles.css';

const HomeCard = ({id, title, description, imageUrl}) => {

  return (
    <div className="card__container">
      <Link to={`/${id}`}>
        <div key={id} className="card__body">
            <LazyLoadImage 
              src={`${process.env.REACT_APP_ASSET_URL}/${imageUrl}`}
              alt={title}
              className="card__body--image"
              width="300px"
              height="400px"
              threshold="0"
              placeholder=""
            />
          <div className="card__overlay">
            <h2 className="card__overlay--title">{`${title.substring(0, 25)}`}</h2>
            <p className="card__overlay--description">{`${description.substring(0, 100)}`}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default HomeCard;