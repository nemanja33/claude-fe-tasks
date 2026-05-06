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

// wrapped in memo as the indivudal cards stay the same
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

  // Adding useCallback() does nothing? I update the whole components anyways, so this would just introduce render time.
  const filterUsers = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchTerm(val);
  }

  // I don't think there is any benefit in wrapping this in useMemo. I would need to add ? chains to filterData which introduces more checks and slows down performances
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

// pogledaj useFetch da li se dobro hendluje, narocito greske. nzm da li da dodajem idle status

export { UserList };

// What is the fetch-on-render problem and does your implementation have it?
// problem with showing something while fetching. Added a loading state to show until data, or error appear.
// What is React reconciliation and why does a stable key matter more than just "avoiding the warning"?
// this should be the process of re-rendering. the key matters, as react can map each item with the key prop to it's correspondint place correctly.
// React.memo prevents re-renders when props don't change — but if you define a callback inside the parent component without useCallback, what happens to React.memo's guarantee?
// all memoized variables, functions need to be all the way memoized, parent, children all. If not then they will not get memoised and practiclly nothing is gained
// When does useMemo for a filter actually save work, and when is it premature optimisation?
// it is usefull if I have unrelated state to this component and I don't want that to rerender.