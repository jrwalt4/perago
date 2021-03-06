import * as React from 'react';
import { connect } from 'react-redux';

import { PgTask } from 'store/models/pg-task';
import { startTask } from 'store/actions';
import { PgAppState } from 'store';
import { recentTasksArraySelector } from 'store/selectors';

import './RecentEntries.css';

type RecentTaskProps = {
  recentTasks: PgTask[];
  continueTask: (taskId: string) => void;
};

let RecentTasksComponent = ({ recentTasks, continueTask }: RecentTaskProps) => (
  <div className="col-12">
    <h4>Recent Tasks</h4>
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
  </div>
);

export let RecentTasks = connect(
  (state: PgAppState) => {
    return {
      recentTasks: recentTasksArraySelector(state)
    };
  },
  (dispatch) => ({
    continueTask: (taskId: string) => {
      dispatch(startTask(taskId));
    }
  })
)(RecentTasksComponent);
