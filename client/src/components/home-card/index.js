import { Link } from 'react-router-dom';
import LazyLoad from 'react-lazyload';

import './styles.css';

const HomeCard = ({id, title, description, imageUrl}) => {

  return (
    <div className="card__container">
      <Link to={`/${id}`}>
        <div key={id} className="card__body">
            <img 
              loading="lazy"
              //TODO ===> Reaplce src when deploying
              src={`http://localhost:5000/${imageUrl}`}
              alt={title}
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

/* <img 
            //TODO ===> Reaplce src when deploying
            src={`http://localhost:5000/${imageUrl}`}"https://source.unsplash.com/random"
            alt={title}
            className="card__body--image"
          /> */

          /* <LazyLoadImage
            //TODO ===> Reaplce src when deploying
            src={`http://localhost:5000/${imageUrl}`} 
            alt={title}
            className="card__body--image"
            height="400px"
            width={imageUrl.width}
          /> */