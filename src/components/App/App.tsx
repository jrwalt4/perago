import * as React from 'react';
import { connect } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Header } from '../containers/Header';
import { Sidebar } from '../containers/Sidebar';
import { PrimaryWindow } from '../containers/PrimaryWindow';
import { TimecardFilter } from '../containers/TimecardFilter';
import { Timecard } from '../containers/Timecard';
import { Rightbar } from '../containers/Rightbar';
import { Footer } from '../containers/Footer';
import { RecentEntries } from '../containers/RecentEntries';
import { EntryDetail } from '../containers/EntryDetail';
import { startEditing } from '../../store/actions';

import './App.css';

type EditDetailsProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
};
const EditDetailsComponent = connect(
  null,
  (dispatch) => ({
    onClick: () => {
      dispatch(startEditing());
    }
  })
)((props: EditDetailsProps) => (
  <button className="col-3 btn btn-info fa fa-edit" onClick={props.onClick} />
));

export const App = () => (
  <div>
    <Header />
    <div className="container-fluid">
      <div className="row">
        <Sidebar className="col-3 bg-info" title="Recent Tasks">
          <RecentEntries />
        </Sidebar>
        <PrimaryWindow className="col-6" title="Timecard">
          <div className="row">
            <TimecardFilter />
          </div>
          <div className="row">
            <Timecard />
          </div>
        </PrimaryWindow>
        <Rightbar className="col-3 bg-warning" title="Details"
          editIcon={<EditDetailsComponent />}>
          <EntryDetail />
        </Rightbar>
      </div>
    </div>
    <Footer />
  </div>
);