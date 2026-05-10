import { Post } from "../../../hooks/posts/usePosts";
import UserPostsSkeleton from "./userPostsSkeleton";
import './userPosts.css'
import { ErrorState } from "../../errorState/errorState";

type UserPostsType = {
  data: Post[] | void,
  isLoading: boolean,
  error: Error | null;
}

const UserPosts = ({
  data,
  isLoading,
  error
}: UserPostsType) => {
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