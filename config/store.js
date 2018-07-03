import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from '../src/reducers';

export default function configureStore(preloadedState) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  /*const composedEnhancers =
    (process.env.NODE_ENV !== 'production' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(...enhancers)) ||
    compose(...enhancers);*/
  const composedEnhancers = compose(...enhancers);

  const store = createStore(reducer, preloadedState, composedEnhancers);

  return store;
}
