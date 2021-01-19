import { Link } from 'react-router-dom';

import './styles.css';

const HomeCard = ({id, title, description, imageUrl}) => {
  return (
    <Link to={`/${id}`} className="">
      <div key={`${id}`} className="card__body">
        <img 
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.J0JE-fKbFT4bxpp8ilPpEQHaHa%26pid%3DApi&f=1" 
          alt=""
          className="card__body__image"
        />
        <div className="card__overlay card__overlay--primary">
          <h3 className="card__overlay__title">{`${title}`}</h3>
          <p className="card__overlay__description">{`${description}`}</p>
        </div>
      </div>
    </Link>
  )
}

export default HomeCard;