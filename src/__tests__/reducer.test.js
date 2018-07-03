import { Map, fromJS } from 'immutable';
import { reducer } from '../reducers';

describe('reducer', () => {
  it('handles SET_ENTRIES', () => {
    const initialState = Map();
    const action = { type: 'SET_ENTRIES', entries: ['Brazil'] };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(fromJS({ entries: ['Brazil'] }));
  });

  it('has an initial state', () => {
    const action = { type: 'SET_ENTRIES', entries: ['Brazil'] };
    const nextState = reducer(undefined, action);
    expect(nextState).toEqual(fromJS({ entries: ['Brazil'] }));
  });

  it('handles NEXT', () => {
    const initialState = fromJS({ entries: ['Brazil', 'France'] });
    const action = { type: 'NEXT' };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        vote: { pair: ['Brazil', 'France'] },
        entries: [],
      })
    );
  });

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: { pair: ['Brazil', 'France'] },
      entries: [],
    });
    const action = { type: 'VOTE', entry: 'Brazil' };
    const nextState = reducer(initialState, action);
    expect(nextState).toEqual(
      fromJS({
        vote: {
          pair: ['Brazil', 'France'],
          tally: {
            Brazil: 1,
          },
        },
        entries: [],
      })
    );
  });

  it('can be used with reduce', () => {
    const actions = [
      { type: 'SET_ENTRIES', entries: ['Brazil', 'France'] },
      { type: 'NEXT' },
      { type: 'VOTE', entry: 'Brazil' },
      { type: 'VOTE', entry: 'France' },
      { type: 'VOTE', entry: 'Brazil' },
      { type: 'NEXT' },
    ];
    const finalState = actions.reduce(reducer, Map());
    expect(finalState).toEqual(fromJS({ winner: 'Brazil' }));
  })
});
