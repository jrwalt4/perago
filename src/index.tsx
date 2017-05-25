import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, Store, Reducer } from 'redux';
import { Provider } from 'react-redux';

import { App } from './components/App/App';
import { reducer } from './reducers/root-reducer';
import { RootState } from './reducers/root-state';
import './index.css';

let store: Store<RootState> = createStore(reducer as Reducer<RootState>);

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById('root') as HTMLElement
);
