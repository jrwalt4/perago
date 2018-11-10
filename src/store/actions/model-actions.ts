import { MomentInput } from 'moment';
import { ThunkAction } from 'redux-thunk';

import { PgAppState } from 'store';
import { PgModel, PgEntry, PgTask } from 'store/models';
import * as data from 'store/data';

/**
 * Model Actions (i.e. actions that change the model)
 * 
 * When adding new actions, create the action-creator function and the 
 * namespace to hold type information (used for type checking in reducer),
 * then add the Action to the union type PgModelAction.
 */

export type PgModelAction =
  loadModelSuccess.Action |
  loadModelError.Action |
  createEntrySuccess.Action |
  createEntryError.Action |
  createTask.Action |
  deleteEntry.Action |
  setTaskName.Action |
  setTaskJob.Action |
  startTask.Action |
  setEntryTask.Action |
  setEntryStartTime.Action |
  setEntryEndTime.Action |
  setEntryDate.Action;

export function loadModel(): ThunkAction<void, PgAppState, {}> {
  return (dispatch, getState) => {
    data.loadModelFromStore().then((model) => {
      dispatch(loadModelSuccess(model));
    }).catch((err) => {
      dispatch(loadModelError(err));
    });
  };
}

export function loadModelSuccess(model: PgModel.PgModelInputs): loadModelSuccess.Action {
  return {
    type: 'LOAD_MODEL_SUCCESS',
    payload: model
  };
}

export namespace loadModelSuccess {
  export type Action = {
    type: 'LOAD_MODEL_SUCCESS',
    payload: PgModel.PgModelInputs
  };
  export const type = 'LOAD_MODEL_SUCCESS';
}

export function loadModelError(err: string): loadModelError.Action {
  return {
    type: 'LOAD_MODEL_ERROR',
    payload: err
  };
}

export namespace loadModelError {
  export type Action = {
    type: 'LOAD_MODEL_ERROR',
    payload: string
  };
  export const type = 'LOAD_MODEL_ERROR';
}

export function createEntry(entry: Partial<PgEntry>): ThunkAction<void, PgAppState, {}> {
  return (dispatch, getState) => {
    data.addEntryToStore(entry).then((result) => {
      dispatch(createEntrySuccess(result));
    }).catch((err) => {
      dispatch(createEntryError(err));
    });
  };
}

export function createEntrySuccess(entry: Partial<PgEntry>): createEntrySuccess.Action {
  return {
    type: 'CREATE_ENTRY_SUCCESS',
    payload: entry
  };
}

export namespace createEntrySuccess {
  export type Action = {
    type: 'CREATE_ENTRY_SUCCESS',
    payload: Partial<PgEntry>
  };
  export const type = 'CREATE_ENTRY_SUCCESS';
}

export function createEntryError(entry: Partial<PgEntry>): createEntryError.Action {
  return {
    type: 'CREATE_ENTRY_ERROR',
    payload: entry
  };
}

export namespace createEntryError {
  export type Action = {
    type: 'CREATE_ENTRY_ERROR',
    payload: Partial<PgEntry>
  };
  export const type = 'CREATE_ENTRY_ERROR';
}

export function deleteEntry(entryId: string): deleteEntry.Action {
  return {
    type: 'DELETE_ENTRY',
    payload: entryId
  };
}

export namespace deleteEntry {
  export type Action = {
    type: 'DELETE_ENTRY',
    payload: string
  };
  export const type = 'DELETE_ENTRY';
}

export function createTask(task: Partial<PgTask>): createTask.Action {
  return {
    type: 'CREATE_TASK',
    payload: task
  };
}

export namespace createTask {
  export type Action = {
    type: 'CREATE_TASK',
    payload: Partial<PgTask>
  };
  export const type = 'CREATE_TASK';
}

export function setTaskName(taskId: string, name: string): setTaskName.Action {
  return {
    type: 'SET_TASK_NAME',
    payload: {
      _id: taskId,
      name: name
    }
  };
}

export namespace setTaskName {
  export type Action = {
    type: 'SET_TASK_NAME',
    payload: {
      _id: string
      name: string
    }
  };
  export const type = 'SET_TASK_NAME';
}

export function setTaskJob(taskId: string, jobId: string): setTaskJob.Action {
  return {
    type: 'SET_TASK_JOB',
    payload: {
      _id: taskId,
      jobId: jobId
    }
  };
}

export namespace setTaskJob {
  export type Action = {
    type: 'SET_TASK_JOB'
    payload: {
      _id: string
      jobId: string
    }
  };
  export const type = 'SET_TASK_JOB';
}

export function startTask(taskId: string): startTask.Action {
  return {
    type: 'START_TASK',
    payload: taskId
  };
}

export namespace startTask {
  export type Action = {
    type: 'START_TASK'
    payload: string
  };
  export const type = 'START_TASK';
}

export function setEntryTask(entryId: string, taskId: string): setEntryTask.Action {
  return {
    type: 'SET_ENTRY_TASK',
    payload: {
      _id: entryId,
      taskId
    }
  };
}

export namespace setEntryTask {
  export type Action = {
    type: 'SET_ENTRY_TASK'
    payload: {
      _id: string
      taskId: string
    }
  };
  export const type = 'SET_ENTRY_TASK';
}

export function setEntryStartTime(entryId: string, hour: number, minute: number = 0): setEntryStartTime.Action {
  return {
    type: 'SET_ENTRY_START_TIME',
    payload: {
      _id: entryId,
      hour,
      minute
    }
  };
}

export namespace setEntryStartTime {
  export type Action = {
    type: 'SET_ENTRY_START_TIME'
    payload: {
      _id: string
      hour: number
      minute?: number
    }
  };
  export const type = 'SET_ENTRY_START_TIME';
}

export function setEntryEndTime(entryId: string, hour: number, minute: number = 0): setEntryEndTime.Action {
  return {
    type: 'SET_ENTRY_END_TIME',
    payload: {
      _id: entryId,
      hour,
      minute
    }
  };
}

export namespace setEntryEndTime {
  export type Action = {
    type: 'SET_ENTRY_END_TIME'
    payload: {
      _id: string
      hour: number
      minute?: number
    }
  };
  export const type = 'SET_ENTRY_END_TIME';
}

export function setEntryDate(entryId: string, date: MomentInput): setEntryDate.Action {
  return {
    type: 'SET_ENTRY_DATE',
    payload: {
      _id: entryId,
      date
    }
  };
}

export namespace setEntryDate {
  export type Action = {
    type: 'SET_ENTRY_DATE'
    payload: {
      _id: string,
      date: MomentInput
    }
  };
  export const type = 'SET_ENTRY_DATE';
}
