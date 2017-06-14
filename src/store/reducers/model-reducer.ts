import { Action } from 'redux';

import { PgModel } from '../models';
import * as actions from '../actions';

export const initialState: PgModel = PgModel.from({
  entries: [
    {
      taskId: '1',
      _id: '2',
      start: new Date,
      end: new Date
    },
    {
      taskId: '1',
      _id: '3',
      start: new Date,
      end: new Date
    },
    {
      taskId: '1',
      _id: '4',
      start: new Date,
      end: new Date
    }
  ],
  tasks: [
    {
      _id: '1',
      name: 'nothing'
    }
  ]
});

export function modelReducer(state: PgModel = initialState, action: Action) {
  switch (action.type) {
    case actions.SetTaskName: {
      let { _id, name } = (action as actions.SetTaskName).payload;
      return state.setIn(['tasks', _id, 'name'], name);
    }
    case actions.SetTaskProject: {
      let { _id, projectId } = (action as actions.SetTaskProject).payload;
      return state.setIn(['tasks', _id, 'project'], projectId);
    }
    default:
      return state;
  }
}