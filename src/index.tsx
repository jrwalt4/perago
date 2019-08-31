import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import ThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from 'scenes/Home';
import { Timecard } from 'scenes/Timecard';
import { Schedule } from 'scenes/Schedule';
import { store, history } from 'store';

const pgTheme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  props: {
    MuiTableRow: {
      hover: true
    }
  }
});

render(
  (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={pgTheme}>
          <Switch>
            <Route path="/timecard" component={Timecard} />
            <Route path="/schedule" component={Schedule} />
            <Route component={Home} />
          </Switch>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  ),
  document.getElementById('root') as HTMLElement
);
