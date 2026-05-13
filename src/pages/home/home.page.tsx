import { FC } from "react";
import { UserList } from "../../widgets/users/userList/userList";

const HomePage: FC = () => {

  return (
    <div className='wrap'>
      <UserList />
    </div>
  )
};

export default HomePage;