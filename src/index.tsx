import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Timecard } from './scenes/Timecard';
import { store, history } from './store';
import './index.css';

render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route path="*" component={Timecard} />
        </div>
      </ConnectedRouter>
    </Provider>
  ),
  document.getElementById('root') as HTMLElement
);
