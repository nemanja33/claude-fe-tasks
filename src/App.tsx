import './App.css';
import { LoginForm } from './widgets/loginForm/loginForm';
import { UserList } from './widgets/users/userList/userList';
import QueryProvider from './client/queryClient';

function App() {
  return (
    <QueryProvider>
      <div className='wrap'>
        {/* Form */}
        <h2 className="h2">Login Form</h2>
        <LoginForm />
        <hr />
        {/* Filterable User List */}
        <UserList />
        <hr />
      </div>
    </QueryProvider>
  );
}

export default App;
