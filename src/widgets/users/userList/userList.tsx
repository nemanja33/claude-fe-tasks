import { ChangeEvent, memo, useCallback, useMemo, useState } from 'react';
import { Input } from '../../../components/input/input';
import { ErrorState } from '../../errorState/errorState';
import './userList.css';
import UserListSkeleton from './userListSkeleton';
import useGetPosts from '../../../hooks/posts/usePosts';
import useGetUsers, { User } from '../../../hooks/users/useUsers';
import { UserPosts } from '../userPosts/userPosts';

function includesString(base: string, incl: string) {
  return base.toLowerCase().includes(incl.toLowerCase())
}

const UserItem = ({
  name,
  email,
  company,
  id
}: User) => {

  const { data, isLoading, error, refetch } = useGetPosts(id);

  return (
    <li className='user-list__list-item'>
      <span className='user-list__user'>
        <button className='user-list__name' onClick={() => refetch()} type='button'>{name}</button>
        <span className='user-list__email'>{email}</span>
      </span>
      <span className='user-list__company'>{company.name}</span>
      <UserPosts data={data} isLoading={isLoading} error={error}/>
    </li>
  )
}

// wrapped in memo as the individual cards stay the same
const MemoUserItem = memo(UserItem);

const UserList = () => {
  const { data, error, isLoading } = useGetUsers();
  const [ searchTerm, setSearchTerm ] = useState<string>('')
  
  const filteredData = useMemo(() =>
    (data ?? []).filter((x: User) => includesString(x.name, searchTerm)),
  [data, searchTerm])

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

// What is the fetch-on-render problem and does your implementation have it?
// problem with showing something while fetching. Added a loading state to show until data, or error appear.
// What is React reconciliation and why does a stable key matter more than just "avoiding the warning"?
// this should be the process of re-rendering. the key matters, as react can map each item with the key prop to it's correspondint place correctly.
// React.memo prevents re-renders when props don't change — but if you define a callback inside the parent component without useCallback, what happens to React.memo's guarantee?
// all memoized variables, functions need to be all the way memoized, parent, children all. If not then they will not get memoised and practiclly nothing is gained
// When does useMemo for a filter actually save work, and when is it premature optimisation?
// it is usefull if I have unrelated state to this component and I don't want that to rerender.

// Answer corrections
// Fetch-on-render — You described a loading state, which is the solution, not the problem. The actual problem is waterfall fetching: Component A renders → starts fetch → data arrives → renders Component B → Component B starts its own fetch. Each child's fetch can't start until its parent finishes rendering. TanStack Query and route-level loaders solve this by starting all fetches before the render tree is built.

// Reconciliation / stable keys — Your answer is right but incomplete. The deeper reason: with index keys, filtering [A, B, C] to [A, C] makes React think item at index 1 is now C (was B) — it mutates the wrong DOM node, causes focus loss, breaks CSS transitions, and unmounts/remounts when it didn't need to. Stable IDs let React say "C is still C, just moved" and reuse the DOM node correctly.

// React.memo + useCallback — Correct idea, imprecise framing. It's not that everything needs to be memoized "all the way." The specific issue is: a non-memoized callback is a new function reference every render. memo does a shallow props comparison — new reference = changed prop = re-render. useCallback makes the reference stable so memo's comparison holds.

// useMemo for filter — Correct. Worth adding: for 10 users, even without memoization the filter is microseconds. useMemo has its own overhead (dep array allocation and comparison). At small scale it's premature — it earns its cost only with large lists or expensive transforms.


// What Task 4 covered
// Custom hook composition — useFetch<T> as a generic primitive, useGetUsers as a domain-specific wrapper; each layer has a single responsibility
// Generic hooks with TypeScript — <T,> syntax for generic function components, letting the caller decide the shape of the response
// Async inside useEffect — define the async function inside the effect, call it immediately; avoids the useCallback indirection and the infinite loop footgun
// React.memo — prevents re-renders when props are shallowly equal; only useful when the component actually re-renders unnecessarily
// useCallback — stabilises function references so memo prop comparisons hold; without it, memo sees a "new" function every render and re-renders anyway
// useMemo placement — hooks cannot be called after early returns; memoised values must be computed unconditionally at the top of the component
// Stable keys and reconciliation — keys let React identify DOM nodes across renders; index keys cause React to reuse the wrong nodes when lists reorder or filter
// Fetch-on-render waterfalls — the real problem is sequential fetches blocked by render phases, not loading states; this is what route-level loaders and TanStack Query solve
// aria-live on dynamic filter results — screen readers don't announce list changes automatically; an aria-live region bridges that gap