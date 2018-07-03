import { List, Map } from 'immutable';

export function setEntries(state, entries) {
  return state.set('entries', List(entries));
}

export function getWinners(currentVote) {
  if (!currentVote) return [];
  const [a, b] = currentVote.get('pair');
  const aVotes = currentVote.getIn(['tally', a], 0);
  const bVotes = currentVote.getIn(['tally', b], 0);

  if (aVotes > bVotes) return [a];
  else if (bVotes > aVotes) return [b];

  return [a, b];
}

export function next(state) {
  const entries = state.get('entries').concat(getWinners(state.get('vote')));
  if (entries.size === 1) {
    return state
      .remove('entries')
      .remove('vote')
      .set('winner', entries.first());
  }
  return state.merge({
    vote: Map({
      pair: entries.take(2),
    }),
    entries: entries.skip(2),
  });
}

export function vote(state, entry) {
  return state.updateIn(['vote', 'tally', entry], 0, tally => tally + 1);
}
