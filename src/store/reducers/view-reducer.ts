import { Action } from 'redux';

export let initialViewState = {
  selectedTask: '',
  selectedEntry: ''
};

export type PgViewState = typeof initialViewState;

export function viewReducer(
  state: PgViewState = initialViewState,
  action: Action): PgViewState {
  return state;
}