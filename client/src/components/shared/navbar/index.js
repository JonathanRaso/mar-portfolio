import { Link } from 'react-router-dom';

import '../../../App.css';
import './styles.css';

const Navbar = () => {
  return (
    <div className="nav__height container">
      <nav className="navbar__body">
        <ul className="navbar__ul flex">
          <li>
            <Link to="/">Réalisations</Link>
          </li>
          <li>
            <Link to="/infos">Infos</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
};

export default Navbar;