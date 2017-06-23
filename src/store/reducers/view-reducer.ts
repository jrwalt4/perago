import { Action } from 'redux';

import * as actions from '../actions';

export let initialViewState = {
  selectedTask: '',
  selectedEntry: '',
  recentTasks: ['1', '5']
};

export type PgViewState = typeof initialViewState;

export function viewReducer(
  state: PgViewState = initialViewState,
  action: Action): PgViewState {
  switch (action.type) {
    case actions.SelectEntry:
      return Object.assign({}, state, { selectedEntry: (action as actions.SelectEntry).payload });
    default:
      return state;
  }
}