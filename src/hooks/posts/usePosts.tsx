import { useQuery } from "@tanstack/react-query";
import createQueryFn from '../createQueryFn';
import { SIXTY_SECONDS } from '../../client/queryClient';

type Post = {
  userId: number,
  id: number,
  title: string,
  body: string
}

const useGetPosts = (id?: number) => {
  const queryFn = () => fetch(`${process.env.REACT_APP_POSTS_API}?userId=${id}`)
  const postsQuery = useQuery({
    queryKey: ['post', id] as const,
    queryFn: createQueryFn<Post[]>({ queryFn }),
    staleTime: SIXTY_SECONDS,
    enabled: !!id
  });
  return postsQuery;
}

export type { Post }

export default useGetPosts