import { ChangeEvent, memo, useCallback, useMemo, useState } from 'react';
import { Input } from '../../../components/input/input';
import './userList.css';
import useGetPosts, { Post } from '../../../hooks/posts/usePosts';
import { User } from '../../../hooks/users/useUsers';
import { UserPosts } from '../userPosts/userPosts';
import { UserFavourite } from './userFavourite';
import { UseQueryResult } from '@tanstack/react-query';

function includesString(base: string, incl: string) {
  return base.toLowerCase().includes(incl.toLowerCase())
}

type UserItemProps = User & {
  onSelect?: (id: number) => void;
  selectedId?: number,
}

interface UserProps {
  users: User[]
}

const MemoFavourite = memo(UserFavourite);

const UserItem = ({
  name,
  email,
  company,
  id,
}: UserItemProps) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const post: UseQueryResult<Post[], Error> | undefined = useGetPosts(id);

  return (
    <li className='user-list__list-item'>
      <div className='user-list__user'>
        <button
          className='user-list__name'
          onClick={() => setIsOpen(!isOpen)}
          type='button'
          disabled={!post}
        >
            {name}
        </button>
        <MemoFavourite userId={id} />
      </div>
      <div>
        <span className='user-list__email'>{email}</span>
        <span className='user-list__company'>{company.name}</span>
      </div>
      {
        isOpen && (
          <UserPosts post={post} />
        )
      }
    </li>
  )
}

// wrapped in memo as the individual cards stay the same
const MemoUserItem = memo(UserItem);

const UserList = ({
  users
}: UserProps) => {
  const [ searchTerm, setSearchTerm ] = useState<string>('')

  const filteredData = useMemo(() =>
    users.filter((x: User) => includesString(x.name, searchTerm)),
  [users, searchTerm])

  const filterUsers = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
  }, [])

  
  return (
    <>
      <Input label='Filter users' onChange={filterUsers} hint="Results will update as you type" />
      <span className="sr-only" aria-live="polite" aria-atomic="true">{filteredData.length} items found</span>
      {
        (!filteredData.length) ? (
          <div className="user-list__no-results">No results found!</div>
        ) :
        (
        <ul className='user-list__list'> 
          {
            filteredData.map((data) => (
              <MemoUserItem
                key={data.id}
                {...data}
              />
            ))
          }
        </ul>
        )
      }
    </>
  )
};


export { UserList };