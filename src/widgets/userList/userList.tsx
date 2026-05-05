import { ChangeEvent, useState } from 'react';
import { Input } from '../../components/input/input';
import useGetUsers, { User } from '../../hooks/useGetUsers';
import { ErrorBoundary } from '../errorBoundary/errorBoundary';
import './userList.css';
import UserListSkeleton from './userListSkeleton';

function includesString(base: string, incl: string) {
  return base.toLowerCase().includes(incl.toLowerCase())
}

const UserList = () => {
  const { apiData, fetchState } = useGetUsers();
  const [ searchTerm, setSearchTerm ] = useState<string>('')

  if (fetchState === 'loading') {
    return <UserListSkeleton />
  }

  if (fetchState === 'error' || !apiData) {
    return <ErrorBoundary />
  }

  function filterUsers(e: ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setSearchTerm(val);
  }

  const filteredData = apiData.filter((x: User) => includesString(x.name, searchTerm))
    
  return (
    <>
      <Input label='Filter users' onChange={filterUsers} />
      <ul className='user-list__list'>
        {
          filteredData.map(({id, name, company, email}) => (
            <li className='user-list__list-item' key={id}>
              <span className='user-list__user'>
                {name}
                <span className='user-list__email'>{email}</span>
              </span>
              <span className='user-list__company'>{company.name}</span>
            </li>
          ))
        }
      </ul>
    </>
  )
};

export { UserList };
