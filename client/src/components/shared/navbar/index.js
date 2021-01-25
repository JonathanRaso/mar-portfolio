import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import '../../../App.css';
import './styles.css';

const Navbar = () => {

  const [openMenu, setOpenMenu] = useState(false);


  const handleMenuButton = () => {
    const burgerMenu = document.querySelector(".navbar__hamburger");
    /* console.log(burgerMenu);
    setOpenMenu(!openMenu);
    console.log(openMenu);
    return burgerMenu; */
    console.log(burgerMenu.classList);
    burgerMenu.classList.toggle("open");
    console.log(burgerMenu.classList);
  }

  return (
    <div className="container">
      <nav className="navbar__body">
        <button className={`navbar__hamburger`} onClick={handleMenuButton}>
          <img src="/MAR-portfolio-menu.png" alt=""/> 
        </button>
        <ul className="navbar__ul flex">
          <li>
            <NavLink to="/" exact className="navbar__ul--link">Réalisations</NavLink>
          </li>
          <li>
            <Link to ="/"><img className="navbar__ul--image" src="/MAR-portfolio-logo.png" alt="logo"/></Link>
          </li>
          <li>
            <NavLink to="/infos" className="navbar__ul--link">Infos</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  )
};

export default Navbar;