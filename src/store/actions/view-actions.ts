/**
 * View Actions (i.e. actions that impact the display but not the model)
 * 
 * When adding new actions, create the action-creator function and the 
 * namespace to hold type information (used for type checking in reducer),
 * then add the Action to the union type PgViewAction.
 */

import { createAction } from '@reduxjs/toolkit';

export type PgViewAction =
  selectEntry |
  selectTask |
  clearSelection |
  setFilter |
  startEditing |
  stopEditing |
  toggleEditing;

export const selectEntry = createAction<string, 'SELECT_ENTRY'>('SELECT_ENTRY');
export type selectEntry = ReturnType<typeof selectEntry>;

export const selectTask = createAction<string, 'SELECT_TASK'>('SELECT_TASK');
export type selectTask = ReturnType<typeof selectTask>;

export const clearSelection = createAction<void, 'CLEAR_SELECTION'>('CLEAR_SELECTION');
export type clearSelection = ReturnType<typeof clearSelection>;

export const setFilter = createAction<string, 'SET_FILTER'>('SET_FILTER');
export type setFilter = ReturnType<typeof setFilter>;

export const startEditing = createAction<void, 'START_EDITING'>('START_EDITING');
export type startEditing = ReturnType<typeof startEditing>;

export const stopEditing = createAction<void, 'STOP_EDITING'>('STOP_EDITING');
export type stopEditing = ReturnType<typeof stopEditing>;

export const toggleEditing = createAction<void, 'TOGGLE_EDITING'>('TOGGLE_EDITING');
export type toggleEditing = ReturnType<typeof toggleEditing>;
