import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import '../../../App.css';
import './styles.css';

const Navbar = () => {

  /* const [btnBurgerOpen, setBtnBurgerOpen] = useState(false);

  const handleMenuButton = () => {
    const burgerMenu = document.querySelector(".navbar__button");
    burgerMenu.classList.toggle("open");
    console.log(burgerMenu);
    console.log(btnBurgerOpen);
    setBtnBurgerOpen(!btnBurgerOpen);
    console.log(btnBurgerOpen);
    console.log("Clicked!");
  } */

  const [btnBurgerOpen, setBtnBurgerOpen] = useState(false);

  const handleMenuButton = () => {
    const burgerMenu = document.querySelector(".nav-toggle");
    console.log(burgerMenu, ' Clicked !');
    burgerMenu.classList.toggle("open");
    burgerMenu.classList.toggle("open");
    console.log(burgerMenu);
    console.log(btnBurgerOpen);
    setBtnBurgerOpen(!btnBurgerOpen);
    console.log(btnBurgerOpen);
    console.log("Clicked!");
  }

  return (
    <header>
      <img src="/MAR-portfolio-logo.png" alt="logo" className="logo"/>
      <input type="checkbox" id="nav-toggle" className="nav-toggle"/>
      <nav>
        <ul>
          <li><NavLink to="/" exact>Projets</NavLink></li>
          <li><NavLink to="/infos" exact>Infos</NavLink></li>
        </ul>
      </nav>
      <label htmlFor="nav-toggle" className="nav-toggle-label" onClick={handleMenuButton}>
        <span></span>
      </label>
    </header>
  )
};

export default Navbar;