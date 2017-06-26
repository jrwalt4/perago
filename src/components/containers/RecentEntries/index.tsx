import * as React from 'react';
import { connect } from 'react-redux';

import { PgModelState, PgViewState } from '../../../store/reducers';
import { PgAppState } from '../../../index';

import './RecentEntries.css';

type RecentEntryProps = {
  model: PgModelState
  view: PgViewState
};

let RecentEntriesComponent = ({ model, view }: RecentEntryProps) => (
  <ul className="RecentEntries">
    {
      view.recentTasks.map((taskId) => (
        <li key={taskId}>{model.tasks.getIn([taskId, 'name'], 'Unknown')}</li>
      ))
    }
  </ul>
);

export let RecentEntries = connect((state: PgAppState) => state)(RecentEntriesComponent);