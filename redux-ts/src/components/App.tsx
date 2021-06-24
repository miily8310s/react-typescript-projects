import RepositoriesList from './RepositoriesList';
import { Provider } from 'react-redux';
import { store } from '../state';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <div>
        <h1>Hi!</h1>
        <RepositoriesList />
      </div>
    </Provider>
  );
};

export default App;
