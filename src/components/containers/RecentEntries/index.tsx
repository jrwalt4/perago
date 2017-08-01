import * as React from 'react';
import { connect } from 'react-redux';

import { PgTask } from '../../../store/models';
import { PgAppState } from '../../../store';

import './RecentEntries.css';

type RecentEntryProps = {
  recentTasks: PgTask[]
};

let RecentEntriesComponent = ({ recentTasks }: RecentEntryProps) => (
  <ul className="RecentEntries">
    {
      recentTasks.map((task) => (
        <li key={task._id}>{task.name || 'Unknown'}</li>
      ))
    }
  </ul>
);

export let RecentEntries = connect(({ model, view }: PgAppState) => {
  return {
    recentTasks: view.recentTasks.map((taskId) => model.tasks.get(taskId))
  };
})(RecentEntriesComponent);