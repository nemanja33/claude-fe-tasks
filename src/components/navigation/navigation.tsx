import { Link } from "react-router";
import { routes } from "../../router/router";
import './navigation.css';

const Navigation = () => {

  return (
    <nav className="navigation">
      <div className="wrap">
        <ul className="navigation__items">
          {
            routes.map(({ label, path }) => (
              <li className="navigation__item" key={label.toLowerCase().replaceAll(' ', '-')}>
                <Link className="navigation__link" to={path}>{label}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </nav>
  )
};

export { Navigation }