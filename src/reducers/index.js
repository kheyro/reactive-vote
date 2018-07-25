import { combineReducers } from 'redux';
import { vote, next, setEntries, INITIAL_STATE } from './core';

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries);
    case 'NEXT':
      return next(state);
    case 'VOTE':
      return state.update('vote', voteState => vote(voteState, action.entry));
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  reducer,
});

export default rootReducer;
