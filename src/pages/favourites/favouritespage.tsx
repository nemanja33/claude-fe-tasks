import { useAppSelector } from "../../redux/hooks";
import "./favourites.css";

const FavouritesPage = () => {
  const favouriteUsers = useAppSelector(state => state.favourites.favs);

  if (!favouriteUsers.length) {
    return <span>No favourite users</span>
  }

  return (
    <ul className="favourites">
      {
        favouriteUsers.map((user) => (
          <li className="favourites__item" key={user}>{user}</li>
        ))
      }
    </ul>
  )
};

export default FavouritesPage;