import useGetUsers from "../../hooks/users/useUsers";
import { selectFavourites } from "../../redux/features/favourites/favouritesSlice";
import { useAppSelector } from "../../redux/hooks";
import { ErrorState } from "../../widgets/errorState/errorState";
import { UserList } from "../../widgets/users/userList/userList";
import UserListSkeleton from "../../widgets/users/userList/userListSkeleton";
import "./favourites.css";

const FavouritesPage = () => {
  const { data, error, isLoading } = useGetUsers();
  const favouriteUsers = useAppSelector(state => selectFavourites(state, data || []));

  if (isLoading) {
    return <UserListSkeleton />
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