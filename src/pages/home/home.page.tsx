import useGetUsers from "../../hooks/users/useUsers";
import { ErrorState } from "../../widgets/errorState/errorState";
import { UserList } from "../../widgets/users/userList/userList";
import UserListSkeleton from "../../widgets/users/userList/userListSkeleton";

const HomePage = () => {
  const { data, error, isLoading } = useGetUsers();
  
  if (isLoading) {
    return <UserListSkeleton />
  }

  if (error || !data) {
    return <ErrorState />
  }

  return <UserList users={data} />
};

export default HomePage;