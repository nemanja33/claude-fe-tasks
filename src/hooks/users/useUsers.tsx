import { useQuery } from '@tanstack/react-query';
import createQueryFn from '../createQueryFn';
import { SIXTY_SECONDS } from '../../client/queryClient';

type User = {
  id: number,
  name: string,
  email: string,
  company: {
    name: string
  }
}

const useGetUsers = () => {
  const queryFn = () => fetch(process.env.REACT_APP_USERS_API as string);
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: createQueryFn<User[]>({queryFn}),
    staleTime: SIXTY_SECONDS
  })

  return usersQuery;
};

export default useGetUsers;
export type { User }