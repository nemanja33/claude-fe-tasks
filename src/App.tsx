import './App.css';
import QueryProvider from './client/queryClient';
import AppRouter from './router/appRouter';

function App() {
  return (
    <QueryProvider>
      <AppRouter />
    </QueryProvider>
  );
}

export default App;
