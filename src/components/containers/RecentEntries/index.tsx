import * as React from 'react';
import { connect } from 'react-redux';

import { PgTask } from '../../../store/models';
import { startTask } from '../../../store/actions';
import { PgAppState } from '../../../store';

import './RecentEntries.css';

type RecentEntryProps = {
  recentTasks: PgTask[];
  continueTask: (taskId: string) => void;
};

let RecentEntriesComponent = ({ recentTasks, continueTask }: RecentEntryProps) => (
  <ul className="RecentEntries">
    {
      recentTasks.map((task) => (
        <li key={task._id}>
          <span>{task.name || 'Unknown'}</span>
          <span className="RecentEntries-controls fa fa-retweet" onClick={() => continueTask(task._id)} />
        </li>
      ))
    }
  </ul>
);

export let RecentEntries = connect(
  ({ model, view }: PgAppState) => {
    return {
      recentTasks: view.recentTasks.map((taskId) => model.tasks.get(taskId))
    };
  },
  (dispatch) => ({
    continueTask: (taskId: string) => {
      dispatch(startTask(taskId));
    }
  }))(RecentEntriesComponent);