import { Action } from 'redux';

export let initialView = {
  selectedTask: '',
  selectedEntry: ''
};

export type PgView = typeof initialView;

export function viewReducer(state: PgView, action: Action): PgView {
  return initialView;
}