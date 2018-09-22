import * as actions from 'store/actions';

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
  action: actions.PgAction): PgViewState {
  switch (action.type) {
    case actions.selectEntry.type:
      if (action.payload === state.selectedEntry) {
        return state;
      }
      return Object.assign({}, state, {
        isEditing: false,
        selectedEntry: action.payload
      });
    case actions.setFilter.type:
      return Object.assign({}, state, { filter: action.payload });
    case actions.startEditing.type:
      return Object.assign({}, state, { isEditing: true });
    case actions.stopEditing.type:
      return Object.assign({}, state, { isEditing: false });
    case actions.toggleEditing.type:
      return Object.assign({}, state, { isEditing: !state.isEditing });
    case actions.deleteEntry.type:
      return Object.assign({}, state, { selectedEntry: '' });
    default:
      return state;
  }
}
