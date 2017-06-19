import * as React from 'react';

import { connect } from 'react-redux';

import { Header } from '../containers/Header';
import { Sidebar } from '../containers/Sidebar';
import { Timecard } from '../containers/Timecard';

import { CombinedState } from '../../index';

import './App.css';

let ConnectedTimecard = connect((state: CombinedState) => state.state)(Timecard);

export const App = () => (
  <div className="App">
    <Header />
    <Sidebar />
    <ConnectedTimecard />
  </div>
);