import * as React from 'react';

import { connect } from 'react-redux';

// import { RootState } from '../../reducers/root-state';
import { Timecard } from '../containers/Timecard/Timecard';

import { CombinedState } from '../../index';

import './App.css';

const logo = require('../../logo.svg');

let ConnectedTimecard = connect((state: CombinedState) => state.state)(Timecard);

export const App = () => {
  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Welcome to React</h2>
      </div>
      <ConnectedTimecard />
    </div>
  );
};