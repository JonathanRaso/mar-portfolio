import { Link } from 'react-router-dom';

import './styles.css';

const HomeCard = ({id, title, description, imageUrl}) => {

  /* const overlayColorPicker = () => {
    const colorClassName = ['primary', 'secondary', 'thirdly'];

    let color;
    colorClassName.map((className) => {
      color = colorClassName[0];
      colorClassName.shift();
      console.log(color);
      console.log(colorClassName.length);
      if (colorClassName.length === 1) {
        colorClassName.push('primary', 'secondary');
      }
      return color;
    });
  };
  let colorClass = overlayColorPicker(); */

  return (
    <Link to={`/${id}`} className="card">
      <div key={`${id}`} className="card__body">
        <img 
          src="https://unsplash.it/450/450" 
          alt=""
          className="card__body__image"
        />
        <div className={`card__overlay card__overlay--primary`}>
          <h3 className="card__overlay__title">{`${title}`}</h3>
          <p className="card__overlay__description">{`${description}`}</p>
        </div>
      </div>
    </Link>
  )
}

export default HomeCard;