import { Link } from 'react-router-dom';

import '../../../App.css';
import './styles.css';

const Navbar = () => {
  return (
    <div className="nav__height container">
      <nav className="navbar__body">
        <ul className="navbar__ul flex">
          <li>
            <Link to="/" className="navbar__ul--link">Réalisations</Link>
          </li>
          <li>
            <Link to ="/"><img className="navbar__ul--image" src="/MAR-portfolio-logo.png" alt="logo"/></Link>
          </li>
          <li>
            <Link to="/infos" className="navbar__ul--link">Infos</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
};

export default Navbar;