import { Button } from './components/button/button';
import { Input  } from './components/input/input';
import './App.css';
import { LoginForm } from './widgets/loginForm/loginForm';

function App() {
  return (
    <div className='wrap'>
      {/* Buttons */}
      <Button variant="primary" size="sm" isLoading>Primary sm</Button>
      <Button variant="primary" size="md">Primary md</Button>
      <Button variant="primary" size="lg">Primary lg</Button>
      <Button variant="secondary" size="sm">Secondary sm</Button>
      <Button variant="ghost" size="sm">Ghost sm</Button>
      {/* Input fields */}
      <Input label='name' hint='Type your name' />

      {/* Form */}
      <LoginForm />
    </div>
  );
}

export default App;
