import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import '../../../App.css';
import './styles.css';

const Navbar = () => {

  const [btnBurgerOpen, setBtnBurgerOpen] = useState(false);

  const handleMenuButton = () => {
    const burgerMenu = document.querySelector(".navbar__button");
    burgerMenu.classList.toggle("open");
    console.log(burgerMenu);
    console.log(btnBurgerOpen);
    setBtnBurgerOpen(!btnBurgerOpen);
    console.log(btnBurgerOpen);
    console.log("Clicked!");
  }

  return (
    <div className="container">
      <nav className="navbar__body">
        <div className="navbar__button" onClick={handleMenuButton}>
          <div className="navbar__button--burger"></div>
        </div>
        <ul className="navbar__ul flex">
            <li>
              <NavLink to="/" exact className="navbar__ul--link">Réalisations</NavLink>
            </li>
          {!btnBurgerOpen &&
            <li className="navbar__image">
              <Link to ="/"><img className="navbar__ul--image" src="/MAR-portfolio-logo.png" alt="logo"/></Link>
            </li>
          } 
            <li>
              <NavLink to="/infos" className="navbar__ul--link">Infos</NavLink>
            </li>
        </ul>
      </nav>
    </div>
  )
};

export default Navbar;