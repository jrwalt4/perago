import { MomentInput } from 'moment';
import { ThunkAction } from 'redux-thunk';

import { PgAppState } from 'store';
import { PgModel, PgEntry, PgTask } from 'store/models';
import { loadModelFromStore } from 'store/data';

export type PgModelAction =
  loadModelSuccess.Action |
  createEntry.Action |
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
    loadModelFromStore().then((model) => {
      dispatch(loadModelSuccess(model));
    });
  };
}

export function loadModelSuccess(model: PgModel.PgModelInputs): loadModelSuccess.Action {
  return {
    type: 'LOAD_MODEL',
    payload: model
  };
}

export namespace loadModelSuccess {
  export type Action = {
    type: 'LOAD_MODEL',
    payload: PgModel.PgModelInputs
  };
  export const type = 'LOAD_MODEL';
}

export function createEntry(entry: Partial<PgEntry>): createEntry.Action {
  return {
    type: 'CREATE_ENTRY',
    payload: entry
  };
}

export namespace createEntry {
  export type Action = {
    type: 'CREATE_ENTRY',
    payload: Partial<PgEntry>
  };
  export const type = 'CREATE_ENTRY';
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
