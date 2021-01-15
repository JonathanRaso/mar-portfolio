import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <h1>Navbar For All Pages</h1>
      <ul>
        <li>
          <Link to="/">Réalisations</Link>
        </li>
        <li>
          <Link to="/infos">Infos</Link>
        </li>
      </ul>
    </div>
  )
};

export default Navbar;