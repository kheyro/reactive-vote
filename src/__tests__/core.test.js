import { List, Map } from 'immutable';

import { setEntries, next, vote } from '../reducers/core';

describe('Application logic', () => {
  describe('setEntries', () => {
    it('adds the entries to the list', () => {
      const state = Map();
      const entries = ['Brazil', 'France'];
      const nextState = setEntries(state, entries);
      expect(nextState).toEqual(
        Map({
          entries: List.of('Brazil', 'France'),
        })
      );
    });
  });

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Brazil', 'France', 'Portugal'),
      });
      const nextState = next(state);
      expect(nextState).toEqual(
        Map({
          vote: Map({
            pair: List.of('Brazil', 'France'),
          }),
          entries: List.of('Portugal'),
        })
      );
    });
  });

  describe('vote', () => {
    it('creates a tally for the voted entries', () => {
      const state = Map({ pair: List.of('Brazil', 'France') });
      const nextState = vote(state, 'Brazil');
      expect(nextState).toEqual(
        Map({ pair: List.of('Brazil', 'France'), tally: Map({ 'Brazil': 1 }) })
      );
    });

    it('add vote to an existing tally', () => {
      const state = Map({
        pair: List.of('Brazil', 'France'),
        tally: Map({
          'Brazil': 4,
          'France': 2,
        }),
      });
      const nextState = vote(state, 'Brazil');
      expect(nextState).toEqual(
        Map({
          pair: List.of('Brazil', 'France'),
          tally: Map({
            'Brazil': 5,
            'France': 2,
          }),
        })
      );
    });

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Brazil', 'France'),
          tally: Map({
            'Brazil': 4,
            'France': 2,
          }),
        }),
        entries: List.of('Portugal', 'Spain', 'Japan'),
      });
      const nextState = next(state);
      expect(nextState).toEqual(
        Map({
          vote: Map({
            pair: List.of('Portugal', 'Spain'),
          }),
          entries: List.of('Japan', 'Brazil'),
        })
      );
    });

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Brazil', 'France'),
          tally: Map({
            'Brazil': 3,
            'France': 3,
          }),
        }),
        entries: List.of('Portugal', 'Spain', 'Japan'),
      });
      const nextState = next(state);
      expect(nextState).toEqual(
        Map({
          vote: Map({
            pair: List.of('Portugal', 'Spain'),
          }),
          entries: List.of('Japan', 'Brazil', 'France'),
        })
      );
    });

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Brazil', 'France'),
          tally: Map({
            'Brazil': 4,
            'France': 2,
          }),
        }),
        entries: List.of(),
      });
      const nextState = next(state);
      expect(nextState).toEqual(Map({ winner: 'Brazil' }));
    });
  });
});
