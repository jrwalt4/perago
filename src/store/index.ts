import {
  applyMiddleware, combineReducers,
  compose, createStore, Store
} from 'redux';
import thunk from 'redux-thunk';

import {
  reducers, routerMiddleware, history,
  PgModelState, PgViewState, PgRouterState
} from 'store/reducers';

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

export let store: Store<PgAppState> = createStore<PgAppState>(
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
