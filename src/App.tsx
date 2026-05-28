import { Provider } from 'react-redux';
import './App.css';
import QueryProvider from './client/queryClient';
import AppRouter from './router/appRouter';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <QueryProvider>
        <AppRouter />
      </QueryProvider>
    </Provider>
  );
}

export default App;
