import useGetUsers from '../../hooks/useGetUsers';
import { ErrorBoundary } from '../errorBoundary/errorBoundary';
import './userList.css';
import UserListSkeleton from './userListSkeleton';

// fetch users - create custom hook to handle all fetching. Something similiar to tanstack query. HAVE to handle a lot.
//// odatle da mi dolazi i loading i error. state is a single union

const UserList = () => {
  const { apiData, fetchState } = useGetUsers();

  if (fetchState === 'loading') {
    return <UserListSkeleton />
  }

  if (fetchState === 'error' || !apiData) {
    return <ErrorBoundary />
  }
  
  return (
    <>
      {
        apiData.map(({id, name, username}) => (
          <div key={id}>{name}, {username}</div>
        ))
      }
    </>
  )
};

export { UserList };
