import * as React from 'react';

import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { PrimaryWindow } from 'components/PrimaryWindow';
import { Rightbar } from 'components/Rightbar';
import { Footer } from 'components/Footer';

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
        <Sidebar className="col-2 bg-info">
          {props.sidebarComponent}
        </Sidebar>
        <PrimaryWindow className="col-7">
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