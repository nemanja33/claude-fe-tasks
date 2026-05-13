import { FC } from "react";
import UserListSkeleton from "../../widgets/users/userList/userListSkeleton";

const HomeSkeleton: FC = () => {
  return (
    <div className='wrap'>
      <UserListSkeleton />
    </div>
  )
};

export default HomeSkeleton;