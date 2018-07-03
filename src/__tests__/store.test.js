import { Map, fromJS } from 'immutable';
import configureStore from '../../config/store';

describe('store', () => {
  it('is a Redux store configured with the correct reducer', () => {
    const store = configureStore();

    expect(store.getState()).toEqual(Map());
    store.dispatch({
      type: 'SET_ENTRIES',
      entries: ['Brazil', 'France'],
    });
    expect(store.getState()).toEqual(fromJS({ entries: ['Brazil', 'France'] }));
  });
});
