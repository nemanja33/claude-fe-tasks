import useGetUsers from "../../hooks/users/useUsers";
import { selectFavourites } from "../../redux/features/favourites/favouritesSlice";
import { useAppSelector } from "../../redux/hooks";
import { ErrorState } from "../../widgets/errorState/errorState";
import { UserList } from "../../widgets/users/userList/userList";
import "./favourites.css";
import FavouritesSkeleton from "./favourites.skeleton";

const FavouritesPage = () => {
  const { data, error, isLoading } = useGetUsers();
  const favouriteUsers = useAppSelector(state => selectFavourites(state, data || []));

  if (isLoading) {
    return <FavouritesSkeleton />
  }

  if (error || !data) {
    return <ErrorState />
  }

  if (!favouriteUsers.length) {
    return <span>No favourite users</span>
  }

  return (
    <UserList users={favouriteUsers} />
  )
};

export default FavouritesPage;