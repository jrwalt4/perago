import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from '../containers/Header';
import { Sidebar } from '../containers/Sidebar';
import { PrimaryWindow } from '../containers/PrimaryWindow';
import { Timecard } from '../containers/Timecard';
import { Rightbar } from '../containers/Rightbar';
import { Footer } from '../containers/Footer';

import './App.css';

export const App = () => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="row">
        <Sidebar className="col-3 bg-info" />
        <PrimaryWindow className="col-6">
          <Timecard />
        </PrimaryWindow>
        <Rightbar className="col-3 bg-warning" />
      </div>
    </div>
    <Footer />
  </div>
);