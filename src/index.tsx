import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { compose, combineReducers, createStore, Store, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter, routerReducer, routerMiddleware, RouterState } from 'react-router-redux';

import createBrowserHistory from 'history/createBrowserHistory';

import { App } from './components/App/App';
import { reducer } from './reducers/root-reducer';
import { RootState } from './reducers/root-state';
import './index.css';

export type CombinedState = {
  state: RootState,
  router: RouterState
};

let history = createBrowserHistory();

interface Window {
  __REDUX_DEVTOOLS_EXTENSION__: typeof applyMiddleware;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose;
}

declare let window: Window;
let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store: Store<CombinedState> = createStore<CombinedState>(
  combineReducers<CombinedState>({
    state: reducer,
    router: routerReducer
  }),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
);

ReactDOM.render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route path="*" component={App} />
        </div>
      </ConnectedRouter>
    </Provider>
  ),
  document.getElementById('root') as HTMLElement
);
