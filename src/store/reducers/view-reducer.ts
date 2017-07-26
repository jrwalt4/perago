import {
  PgAction, selectEntry, setFilter, startEditing,
  toggleEditing, startTask, setEntryTask
} from '../actions';

export type PgViewState = {
  selectedTask: string
  selectedEntry: string
  recentTasks: string[]
  filter: string
  isEditing: boolean
};

export let initialViewState: PgViewState = {
  selectedTask: '',
  selectedEntry: '',
  recentTasks: ['1', '5'],
  filter: '',
  isEditing: false
};

export function viewReducer(
  state: PgViewState = initialViewState,
  action: PgAction): PgViewState {
  switch (action.type) {
    case selectEntry.type:
      return Object.assign({}, state, { selectedEntry: action.payload });
    case startTask.type:
    case setEntryTask.type:
      let newTask = typeof action.payload === 'string' ? action.payload : action.payload.taskId;
      let newRecentTasks = [newTask, ...state.recentTasks.filter((taskId) => taskId !== action.payload)];
      return Object.assign({}, state, { recentTasks: newRecentTasks });
    case setFilter.type:
      return Object.assign({}, state, { filter: action.payload });
    case startEditing.type:
      return Object.assign({}, state, { isEditing: true });
    case toggleEditing.type:
      return Object.assign({}, state, { isEditing: !state.isEditing });
    default:
      return state;
  }
}