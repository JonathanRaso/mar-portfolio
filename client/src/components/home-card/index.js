import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './styles.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

const HomeCard = ({id, title, description, imageUrl}) => {

  return (
    <div className="card__container">
      <Link to={`/${id}`}>
        <div key={id} className="card__body">
            <LazyLoadImage 
              //TODO ===> Reaplce src when deploying
              src={`http://localhost:5000/${imageUrl}`}
              alt={title}
              className="card__body--image"
              width="300px"
              height="400px"
              threshold="0"
              effet="blur"
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