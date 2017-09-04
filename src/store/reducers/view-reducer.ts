import {
  PgAction, selectEntry, setFilter, startEditing, stopEditing,
  toggleEditing, startTask, setEntryTask, deleteEntry
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
      let otherTasks = state.recentTasks.filter((taskId) => taskId !== newTask);
      let newRecentTasks = [newTask, ...otherTasks];
      return Object.assign({}, state, { recentTasks: newRecentTasks });
    case setFilter.type:
      return Object.assign({}, state, { filter: action.payload });
    case startEditing.type:
      return Object.assign({}, state, { isEditing: true });
    case stopEditing.type:
      return Object.assign({}, state, { isEditing: false });
    case toggleEditing.type:
      return Object.assign({}, state, { isEditing: !state.isEditing });
    case deleteEntry.type:
      return Object.assign({}, state, { selectedEntry: '' });
    default:
      return state;
  }
}