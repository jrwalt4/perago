import { PgEntry } from '../models';

export type PgModelAction =
  createEntry.Action |
  setTaskName.Action |
  setTaskJob.Action |
  startTask.Action |
  setEntryStartTime.Action;

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