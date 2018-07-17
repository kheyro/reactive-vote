import configureStore from '../config/store';
import startServer from '../server';

const store = configureStore();
startServer(store);

store.dispatch({
  type: 'SET_ENTRIES',
  entries: require('./entries.json'),
});

store.dispatch({ type: 'NEXT' });
