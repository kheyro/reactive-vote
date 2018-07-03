it('is an immutable function', () => {
  const increment = currentState => currentState + 1;
  const state = 42;
  const nextState = increment(state);

  expect(nextState).toEqual(43);
  expect(state).toEqual(42);
});
