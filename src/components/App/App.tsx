import * as React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from '../containers/Header';
import { Sidebar } from '../containers/Sidebar';
import { PrimaryWindow } from '../containers/PrimaryWindow';
import { Timecard } from '../containers/Timecard';
import { Rightbar } from '../containers/Rightbar';
import { Footer } from '../containers/Footer';
import { RecentEntries } from '../containers/RecentEntries';
import { EntryDetail } from '../containers/EntryDetail';

import './App.css';

export const App = () => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="row">
        <Sidebar className="col-2 bg-info" title="Recent Tasks">
          <RecentEntries />
        </Sidebar>
        <PrimaryWindow className="col-7" title="Timecard">
          <div className="row">
            <Timecard />
          </div>
        </PrimaryWindow>
        <Rightbar className="col-3 bg-warning">
          <EntryDetail />
        </Rightbar>
      </div>
    </div>
    <Footer />
  </div>
);