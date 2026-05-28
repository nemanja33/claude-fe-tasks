import { Link } from "react-router";
import './navigation.css';
import { ROUTES } from "../../router/routes";
import { useAppSelector } from "../../redux/hooks";

const Navigation = () => {
  const favouritesCount = useAppSelector(state => state.favourites.favs);

  return (
    <nav className="navigation">
      <div className="wrap">
        <ul className="navigation__items">
          {
            Object.entries(ROUTES).map((data) => {
              const route = data[0];
              const path = data[1].path;
              const count = data[1].count;

              return (
                <li className="navigation__item" key={route.toLowerCase().replaceAll(' ', '-')}>
                  <Link className="navigation__link" to={path}>{route}</Link>
                  {(!!count && favouritesCount.length > 0) && <span className="navigation__count">{favouritesCount.length}</span>}
                </li>
              )
            })
          }
        </ul>
      </div>
    </nav>
  )
};

export { Navigation }