import * as React from 'react';

import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { PrimaryWindow } from '../PrimaryWindow';
import { Rightbar } from '../Rightbar';
import { Footer } from '../Footer';

export interface AppContainerProps {
  sidebarComponent?: JSX.Element;
  primaryComponent?: JSX.Element;
  rightbarComponent?: JSX.Element;
}

export const AppContainer = (props: AppContainerProps) => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="row">
        <Sidebar className="col-2 bg-info" title="Recent Tasks">
          {props.sidebarComponent}
        </Sidebar>
        <PrimaryWindow className="col-7" title="Timecard">
          <div className="row">
            {props.primaryComponent}
          </div>
        </PrimaryWindow>
        <Rightbar className="col-3 bg-warning">
          {props.rightbarComponent}
        </Rightbar>
      </div>
    </div>
    <Footer />
  </div>
);