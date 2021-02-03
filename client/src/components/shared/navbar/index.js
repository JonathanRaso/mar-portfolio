import { NavLink } from 'react-router-dom';

import '../../../App.css';
import './styles.css';

const Navbar = () => {

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
      <label htmlFor="nav-toggle" className="nav-toggle-label">
        <span></span>
      </label>
    </header>
  )
};

export default Navbar;