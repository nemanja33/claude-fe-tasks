import { useQueryClient } from '@tanstack/react-query';
import createQueryFn from '../createQueryFn';
import { SIXTY_SECONDS } from '../../client/queryClient';
import { User } from '../../types/users';


const useGetUsers = () => {
  const queryClint = useQueryClient();
  const queryFn = () => fetch(process.env.REACT_APP_USERS_API as string);

  const usersQuery = async () => {
    await queryClint.prefetchQuery({
      queryKey: ['users'],
      queryFn: createQueryFn<User[]>({queryFn}),
      staleTime: SIXTY_SECONDS
    })
  }

  return usersQuery();
};

export default useGetUsers;
export type { User }