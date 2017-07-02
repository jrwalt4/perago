import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { App } from './components/App/App';
import { store, history } from './store';
import './index.css';

render(
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
