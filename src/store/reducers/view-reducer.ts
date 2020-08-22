/**
 * View reducer
 */
import { createReducer } from '@reduxjs/toolkit';
import * as actions from 'store/actions';

export type PgViewState = {
  selectedTask: string
  selectedEntry: string
  filter: string
  isEditing: boolean,
  isFetchingData: boolean
};

export let initialViewState: PgViewState = {
  selectedTask: '',
  selectedEntry: '',
  filter: '',
  isEditing: false,
  isFetchingData: false
};

export const viewReducer = createReducer(initialViewState, {
  [actions.loadModelBegin.type]: (state: PgViewState) => {
    state.isFetchingData = true;
  },
  [actions.loadModelError.type]: (state: PgViewState, action) => {
    state.isFetchingData = false;
  },
  [actions.loadModelSuccess.type]: (state: PgViewState, action) => {
    state.isFetchingData = false;
  },
  [actions.selectEntry.type]: (state: PgViewState, action: actions.selectEntry) => {
    if (action.payload !== state.selectedEntry) {
      state.isEditing = false;
      state.selectedEntry = action.payload;
    }
  },
  [actions.clearSelection.type]: (state: PgViewState) => {
      state.selectedEntry = '';
  },
  [actions.setFilter.type]: (state: PgViewState, action: actions.setFilter) => {
    state.filter = action.payload;
  },
  [actions.startEditing.type]: (state: PgViewState, action) => {
    state.isEditing = true;
  },
  [actions.stopEditing.type]: (state: PgViewState, action) => {
    state.isEditing = false;
  },
  [actions.toggleEditing.type]: (state: PgViewState, action) => {
    state.isEditing = !state.isEditing;
  },
  [actions.deleteEntry.type]: (state: PgViewState, action) => {
    if (state.selectedEntry === action.payload) {
        state.selectedEntry = '';
      }
    }
  }
);
