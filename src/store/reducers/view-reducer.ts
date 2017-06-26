import { PgAction, selectEntry, setFilter } from '../actions';

export type PgViewState = {
  selectedTask: string
  selectedEntry: string
  recentTasks: string[]
  filter: string
};

export let initialViewState: PgViewState = {
  selectedTask: '',
  selectedEntry: '',
  recentTasks: ['1', '5'],
  filter: ''
};

export function viewReducer(
  state: PgViewState = initialViewState,
  action: PgAction): PgViewState {
  switch (action.type) {
    case selectEntry.Type:
      return Object.assign({}, state, { selectedEntry: action.payload });
    case setFilter.Type:
      return Object.assign({}, state, { filter: action.payload });
    default:
      return state;
  }
}