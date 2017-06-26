import { PgAction, selectEntry } from '../actions';

export let initialViewState = {
  selectedTask: '',
  selectedEntry: '',
  recentTasks: ['1', '5']
};

export type PgViewState = typeof initialViewState;

export function viewReducer(
  state: PgViewState = initialViewState,
  action: PgAction): PgViewState {
  switch (action.type) {
    case selectEntry.Type:
      return Object.assign({}, state, { selectedEntry: action.payload });
    default:
      return state;
  }
}