import { Button } from './components/button/button';
import { Input  } from './components/input/input';
import './App.css';
import { LoginForm } from './widgets/loginForm/loginForm';
import { UserList } from './widgets/userList/userList';

function App() {
  return (
    <div className='wrap'>
      {/* Buttons */}
      <h2 className="h2">Buttons</h2>
      <Button variant="primary" size="sm" isLoading>Primary sm</Button>
      <Button variant="primary" size="md">Primary md</Button>
      <Button variant="primary" size="lg">Primary lg</Button>
      <Button variant="secondary" size="sm">Secondary sm</Button>
      <Button variant="ghost" size="sm">Ghost sm</Button>
      <hr />
      <h2 className="h2">Input field</h2>
      {/* Input fields */}
      <Input label='name' hint='Type your name' />
      <hr />
      {/* Form */}
      <h2 className="h2">Login Form</h2>
      <LoginForm />
      <hr />
      {/* Filterable User List */}
      <UserList />
      <hr />
    </div>
  );
}

export default App;
