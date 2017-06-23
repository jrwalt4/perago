
type PgAction<T> = {
  type: string
  payload: T
};

export type SetTaskName = PgAction<{ _id: string, name: string }>;
export const SetTaskName = 'SET_TASK_NAME';

export type SetTaskJob = PgAction<{ _id: string, jobId: string }>;
export const SetTaskJob = 'SET_TASK_JOB';

export type SetTaskProject = PgAction<{ _id: string, projectId: string }>;
export const SetTaskProject = 'SET_TASK_PROJECT';

export type SelectEntry = PgAction<string>;
export const SelectEntry = 'SELECT_ENTRY';