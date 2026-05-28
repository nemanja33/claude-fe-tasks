import { useAppSelector } from "../../redux/hooks";

const FavouritesPage = () => {
  const favouriteUsers = useAppSelector(state => state.favourites.favs);

  if (!favouriteUsers.length) {
    return <span>No favourite users</span>
  }

  return (
    <ul>
      {
        favouriteUsers.map((user) => (
          <li key={user}>{user}</li>
        ))
      }
    </ul>
  )
};

export default FavouritesPage;