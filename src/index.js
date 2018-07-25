import configureStore from '../config/store';
import startServer from '../server';

const entries = require('./entries.json');

const store = configureStore();
startServer(store);

store.dispatch({
  type: 'SET_ENTRIES',
  entries,
});

store.dispatch({ type: 'NEXT' });
