import { Link, NavLink } from 'react-router-dom';

import '../../../App.css';
import './styles.css';

const Navbar = () => {
  return (
    <div className="container">
      <nav className="navbar__body">
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