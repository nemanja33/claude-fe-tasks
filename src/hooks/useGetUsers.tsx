import { useCallback } from 'react';
import useFetch, { FetchState } from "./useFetch";

type User = {
  id: number,
  name: string,
  username: string
}

interface Users {
  apiData: User[] | null,
  fetchState: FetchState
}

const useGetUsers = (): Users => {
  const queryFn = useCallback(
    () => fetch(process.env.REACT_APP_USERS_API as string),
    []
  );

  return useFetch({ queryFn });
};

export default useGetUsers;