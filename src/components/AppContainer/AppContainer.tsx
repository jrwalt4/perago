import * as React from 'react';

import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { PrimaryWindow } from 'components/PrimaryWindow';
import { Rightbar } from 'components/Rightbar';
import { Footer } from 'components/Footer';

import { PgAppState } from 'store';
import { connect } from 'react-redux';

export interface AppContainerProps {
  sidebarComponent?: JSX.Element;
  primaryComponent?: JSX.Element;
  rightbarComponent?: JSX.Element;
}

export interface AppContainerStateProps {
  isFetching: boolean;
}

function AppContainerComponent (props: AppContainerProps & AppContainerStateProps) {
  if (props.isFetching) {
    return <span>... loading</span>;
  }
  return (
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
}

export const AppContainer = connect<AppContainerStateProps, null, AppContainerProps, PgAppState>(
  (state: PgAppState) => ({ isFetching: state.view.isFetchingData })
)(AppContainerComponent);
