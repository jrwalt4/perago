import * as React from 'react';

import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from '../containers/Header';
import { Sidebar } from '../containers/Sidebar';
import { PrimaryWindow } from '../containers/PrimaryWindow';
import { Timecard } from '../containers/Timecard';
import { Rightbar } from '../containers/Rightbar';
import { Footer } from '../containers/Footer';

import { CombinedState } from '../../index';

import './App.css';

let ConnectedTimecard = connect((state: CombinedState) => state.state)(Timecard);

export const App = () => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <PrimaryWindow>
          <ConnectedTimecard />
        </PrimaryWindow>
        <Rightbar />
      </div>
    </div>
    <Footer />
  </div>
);