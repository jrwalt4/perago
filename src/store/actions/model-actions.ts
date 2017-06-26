export type PgModelAction =
  setTaskName.Type |
  setTaskJob.Type;

export function setTaskName(taskId: string, name: string): setTaskName.Type {
  return {
    type: 'SET_TASK_NAME',
    payload: {
      _id: taskId,
      name: name
    }
  };
}

export namespace setTaskName {
  export type Type = {
    type: 'SET_TASK_NAME',
    payload: {
      _id: string
      name: string
    }
  };
  export const Type = 'SET_TASK_NAME';
}

export function setTaskJob(taskId: string, jobId: string): setTaskJob.Type {
  return {
    type: 'SET_TASK_JOB',
    payload: {
      _id: taskId,
      jobId: jobId
    }
  };
}

export namespace setTaskJob {
  export type Type = {
    type: 'SET_TASK_JOB'
    payload: {
      _id: string
      jobId: string
    }
  };
  export const Type = 'SET_TASK_JOB';
}