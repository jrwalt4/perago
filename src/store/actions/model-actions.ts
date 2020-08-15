import { MomentInput } from 'moment';
import { Action as ReduxAction } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import { PgAppState } from 'store';

import { PgEntry } from 'store/models/pg-entry';
import { PgTask } from 'store/models/pg-task';
import { PgModelInputs } from 'store/models/pg-model';
import * as data from 'store/data';

/**
 * Model Actions (i.e. actions that change the model)
 * 
 * When adding new actions, create the action-creator function and the 
 * namespace to hold type information (used for type checking in reducer),
 * then add the Action to the union type PgModelAction.
 */

export type PgModelAction =
  loadModelBegin |
  loadModelSuccess |
  loadModelError |
  createEntrySuccess |
  createEntryError |
  createTask |
  deleteEntry |
  setTaskName |
  setTaskJob |
  startTask |
  setEntryTask |
  setEntryStartTime |
  setEntryEndTime |
  setEntryDate;

export type PgThunkAction<R, A extends ReduxAction> = ThunkAction<R, PgAppState, void, A>;

export const loadModelBegin = createAction<void, 'LOAD_MODEL_BEGIN'>('LOAD_MODEL_BEGIN');
export type loadModelBegin = ReturnType<typeof loadModelBegin>;

export const loadModelSuccess = createAction<PgModelInputs, 'LOAD_MODEL_SUCCESS'>('LOAD_MODEL_SUCCESS');
export type loadModelSuccess = ReturnType<typeof loadModelSuccess>;

export const loadModelError = createAction<string, 'LOAD_MODEL_ERROR'>('LOAD_MODEL_ERROR');
export type loadModelError = ReturnType<typeof loadModelError>;

export function loadModel():
  PgThunkAction<void, loadModelBegin | loadModelSuccess | loadModelError> {
  return (dispatch, getState) => {
    dispatch(loadModelBegin());
    data.loadModelFromStore().then((model) => {
      dispatch(loadModelSuccess(model));
    }).catch((err) => {
      dispatch(loadModelError(err));
    });
  };
}

export const createEntrySuccess = createAction<Partial<PgEntry>, 'CREATE_ENTRY_SUCCESS'>('CREATE_ENTRY_SUCCESS');
export type createEntrySuccess = ReturnType<typeof createEntrySuccess>;

export const createEntryError = createAction<Partial<PgEntry>, 'CREATE_ENTRY_ERROR'>('CREATE_ENTRY_ERROR');
export type createEntryError = ReturnType<typeof createEntryError>;

export function createEntry(entry: Partial<PgEntry>): ThunkAction<
  void,
  PgAppState,
  undefined,
  createEntrySuccess | createEntryError
  > {
  return (dispatch) => {
    data.addEntryToStore(entry).then((result) => {
      dispatch(createEntrySuccess(result));
    }).catch((err) => {
      dispatch(createEntryError(err));
    });
  };
}

export const deleteEntry = createAction<string, 'DELETE_ENTRY'>('DELETE_ENTRY');
export type deleteEntry = ReturnType<typeof deleteEntry>;

export const createTask = createAction<Partial<PgTask>, 'CREATE_TASK'>('CREATE_TASK');
export type createTask = ReturnType<typeof createTask>;

function prepareSetTaskname(taskId: string, name: string) {
  return {
    type: 'SET_TASK_NAME',
    payload: {
      _id: taskId,
      name: name
    }
  };
}
export const setTaskName =
  createAction<typeof prepareSetTaskname, 'SET_TASK_NAME'>('SET_TASK_NAME', prepareSetTaskname);
export type setTaskName = ReturnType<typeof setTaskName>;

const prepareSetTaskJob = (_id: string, jobId: string) => ({
  type: 'SET_TASK_JOB',
  payload: {
    _id,
    jobId
  }
});
export const setTaskJob = createAction<typeof prepareSetTaskJob, 'SET_TASK_JOB'>('SET_TASK_JOB', prepareSetTaskJob);
export type setTaskJob = ReturnType<typeof setTaskJob>;

export const startTask = createAction<string, 'START_TASK'>('START_TASK');
export type startTask = ReturnType<typeof startTask>;

function prepareSetEntryTask(entryId: string, taskId: string) {
  return {
    type: 'SET_ENTRY_TASK',
    payload: {
      _id: entryId,
      taskId
    }
  };
}
export const setEntryTask =
  createAction<typeof prepareSetEntryTask, 'SET_ENTRY_TASK'>('SET_ENTRY_TASK', prepareSetEntryTask);
export type setEntryTask = ReturnType<typeof setEntryTask>;

export function prepareSetEntryStartTime(entryId: string, hour: number, minute: number = 0) {
  return {
    type: 'SET_ENTRY_START_TIME',
    payload: {
      _id: entryId,
      hour,
      minute
    }
  };
}
export const setEntryStartTime =
  createAction<typeof prepareSetEntryStartTime, 'SET_ENTRY_START_TIME'>(
    'SET_ENTRY_START_TIME',
    prepareSetEntryStartTime
  );
export type setEntryStartTime = ReturnType<typeof setEntryStartTime>;

function prepareSetEntryEndTime(entryId: string, hour: number, minute: number = 0) {
  return {
    type: 'SET_ENTRY_END_TIME',
    payload: {
      _id: entryId,
      hour,
      minute
    }
  };
}
export const setEntryEndTime =
  createAction<typeof prepareSetEntryEndTime, 'SET_ENTRY_END_TIME'>(
    'SET_ENTRY_END_TIME',
    prepareSetEntryEndTime
  );
export type setEntryEndTime = ReturnType<typeof setEntryEndTime>;

function prepareSetEntryDate(entryId: string, date: MomentInput) {
  return {
    type: 'SET_ENTRY_DATE',
    payload: {
      _id: entryId,
      date
    }
  };
}
export const setEntryDate = 
  createAction<typeof prepareSetEntryDate, 'SET_ENTRY_DATE'>(
    'SET_ENTRY_DATE',
    prepareSetEntryDate
  );
export type setEntryDate = ReturnType<typeof setEntryDate>;
