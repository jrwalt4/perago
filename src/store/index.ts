import {
  applyMiddleware, combineReducers,
  compose, createStore
} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';

import {
  reducers, routerMiddleware, history,
  PgModelState, PgViewState, PgRouterState
} from 'store/reducers';
import { loadModel, PgAction } from './actions';

export type PgAppState = {
  model: PgModelState
  view: PgViewState
  router: PgRouterState
};

// 'history' is used by index.tsx to create the ConnectedRouter component
export { PgModelState, PgViewState, PgRouterState, history } from './reducers';

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: typeof applyMiddleware;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
}

declare let window: Window;
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export let store = createStore<PgAppState, PgAction, {dispatch: ThunkDispatch<PgAppState, void, PgAction>}, {}>(
  combineReducers<PgAppState>({
    ...reducers
  }),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
);

// user selecting and opening a model isn't implemented
// yet (i.e. open from file, indexedDb, server, etc.),
// so bootstrap test model here during development
store.dispatch(loadModel());
