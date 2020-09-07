import {
  applyMiddleware, combineReducers,
  compose, createStore
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {
  reducers, routerMiddleware, history as browserHistory,
  PgModelState as ModelState, PgViewState as ViewState, PgRouterState as RouterState
} from './reducers';
import mainSaga from './sagas';

export type PgModelState = ModelState; 
export type PgViewState = ViewState;
export type PgRouterState = RouterState;
// 'history' is used by index.tsx to create the ConnectedRouter component
export const history = browserHistory;

export type PgAppState = {
  model: PgModelState
  view: PgViewState
  router: PgRouterState
};

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: typeof applyMiddleware;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
}

declare let window: Window;
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export let store = createStore(
  combineReducers<PgAppState>({
    ...reducers
  }),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      sagaMiddleware
    )
  )
);

sagaMiddleware.run(mainSaga);
