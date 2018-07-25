import { createStore, applyMiddleware, compose } from 'redux';
import { reducer } from '../src/reducers';

export default function configureStore(preloadedState) {
  const middlewares = [];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [];
  const composedEnhancers = compose(middlewareEnhancer, ...enhancers);

  const store = createStore(reducer, preloadedState, composedEnhancers);

  return store;
}
