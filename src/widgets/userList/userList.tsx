import { ChangeEvent, memo, useState } from 'react';
import { Input } from '../../components/input/input';
import useGetUsers, { User } from '../../hooks/useGetUsers';
import { ErrorBoundary } from '../errorBoundary/errorBoundary';
import './userList.css';
import UserListSkeleton from './userListSkeleton';

function includesString(base: string, incl: string) {
  return base.toLowerCase().includes(incl.toLowerCase())
}

const UserItem = ({
  name,
  email,
  company
}: User) => {

  return (
    <li className='user-list__list-item'>
      <span className='user-list__user'>
        {name}
        <span className='user-list__email'>{email}</span>
      </span>
      <span className='user-list__company'>{company.name}</span>
    </li>
  )
}

// wrapped in memo as the individual cards stay the same
const MemoUserItem = memo(UserItem);

const UserList = () => {
  const { apiData, fetchState } = useGetUsers();
  const [ searchTerm, setSearchTerm ] = useState<string>('')

  if (fetchState === 'pending') {
    return <UserListSkeleton />
  }

  if (fetchState === 'failed' || !apiData) {
    return <ErrorBoundary />
  }

  const filterUsers = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
  }

  const filteredData = apiData.filter((x: User) => includesString(x.name, searchTerm))
    
  return (
    <>
      <Input label='Filter users' onChange={filterUsers} hint="Results will update as you type" />
      <span className="sr-only" aria-live="polite" aria-atomic="true">{filteredData.length} items found</span>
      {
        (!filteredData.length && fetchState === 'succeeded') ? (
          <div className="user-list__no-results">No results found!</div>
        ) :
        (
        <ul className='user-list__list'>
          {
            filteredData.map((data) => (
              <MemoUserItem key={data.id} {...data} />
            ))
          }
        </ul>
        )
      }
    </>
  )
};


export { UserList };
