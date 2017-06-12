import { Action } from 'redux';

import { PgModel } from '../models/pg-model';
import * as actions from '../actions/actions';

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
    case actions.SET_TASK_NAME:
      return state.setIn(
        ['tasks', (<actions.SetTaskNameAction>action).payload.taskId],
        (<actions.SetTaskNameAction>action).payload.name);
    default:
      return state;
  }
}