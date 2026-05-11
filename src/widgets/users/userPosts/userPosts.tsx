import { Post } from "../../../hooks/posts/usePosts";
import UserPostsSkeleton from "./userPostsSkeleton";
import './userPosts.css'
import { ErrorState } from "../../errorState/errorState";

type UserPostsType = {
  post: {
    data: Post[] | undefined,
    isLoading: boolean,
    error: Error | null;
  }
}

const UserPosts = ({
  post
}: UserPostsType) => {
  const { isLoading, error, data } = post
  if (isLoading) {
    return <UserPostsSkeleton />
  }

  if (error) {
    return <ErrorState />
  }

  return (
    <>
      {!!data && (
        <ul className="user-posts">
          {
            data.map((post) => (
              <li className="user-posts__item" key={post.id}>{post.title}</li>
            ))
          }
        </ul>
      )}
    </>
  )
};

export { UserPosts }