import { ChangeEvent, memo, useCallback, useMemo, useState } from 'react';
import { Input } from '../../../components/input/input';
import { ErrorState } from '../../errorState/errorState';
import './userList.css';
import UserListSkeleton from './userListSkeleton';
import useGetPosts, { Post } from '../../../hooks/posts/usePosts';
import useGetUsers, { User } from '../../../hooks/users/useUsers';
import { UserPosts } from '../userPosts/userPosts';
import { UseQueryResult } from '@tanstack/react-query';

function includesString(base: string, incl: string) {
  return base.toLowerCase().includes(incl.toLowerCase())
}

type UserItemProps = User & {
  post: UseQueryResult<Post[], Error> | undefined,
  onSelect: (id: number) => void;
  selectedId?: number,
}

const UserItem = ({
  name,
  email,
  company,
  id,
  post,
  onSelect,
  selectedId
}: UserItemProps) => {
  return (
    <li className='user-list__list-item'>
      <span className='user-list__user'>
        <button
          className='user-list__name'
          onClick={() => onSelect(id)}
          type='button'>
            {name}
        </button>
        <span className='user-list__email'>{email}</span>
      </span>
      <span className='user-list__company'>{company.name}</span>
      {
        selectedId === id && post && (
          <UserPosts post={post} />
        )
      }
    </li>
  )
}

// wrapped in memo as the individual cards stay the same
const MemoUserItem = memo(UserItem);

const UserList = () => {
  const { data, error, isLoading } = useGetUsers();
  const [ searchTerm, setSearchTerm ] = useState<string>('')
  const [ selectedId, setSelectedId ] = useState<number | undefined>();
  const post = useGetPosts(selectedId);
  
  const filteredData = useMemo(() =>
    (data ?? []).filter((x: User) => includesString(x.name, searchTerm)),
  [data, searchTerm])

  const handleSelect = useCallback((id: number) => {
    setSelectedId(id);
  }, []);

  const filterUsers = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
  }, [])

  if (isLoading) {
    return <UserListSkeleton />
  }

  if (error || !data) {
    return <ErrorState />
  }
  
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
                selectedId={selectedId}
                onSelect={handleSelect}
                post={data.id === selectedId ? post : undefined}
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