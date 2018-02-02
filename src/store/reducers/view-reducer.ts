import {
  PgAction, selectEntry, setFilter, startEditing, stopEditing,
  toggleEditing, deleteEntry
} from 'store/actions';

export type PgViewState = {
  selectedTask: string
  selectedEntry: string
  filter: string
  isEditing: boolean
};

export let initialViewState: PgViewState = {
  selectedTask: '',
  selectedEntry: '',
  filter: '',
  isEditing: false
};

export function viewReducer(
  state: PgViewState = initialViewState,
  action: PgAction): PgViewState {
  switch (action.type) {
    case selectEntry.type:
      if (action.payload === state.selectedEntry) {
        return state;
      }
      return Object.assign({}, state, {
        isEditing: false,
        selectedEntry: action.payload
      });
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