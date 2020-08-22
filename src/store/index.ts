import {
  applyMiddleware, combineReducers,
  compose, createStore
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {
  reducers, routerMiddleware, history,
  PgModelState, PgViewState, PgRouterState
} from 'store/reducers';
import mainSaga from './sagas';

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
