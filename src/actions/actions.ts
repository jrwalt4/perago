import { Action } from 'redux';

export const SET_TASK_NAME = 'SET_TASK_NAME';
export interface SetTaskNameAction extends Action {
    payload: {
        taskId: string,
        name: string
    };
}
export function setTaskName(taskId: string, name: string): SetTaskNameAction {
    return {
        type: SET_TASK_NAME,
        payload: { taskId, name }
    };
}

export const SET_TASK_JOB = 'SET_TASK_JOB';
export interface SetTaskJobAction extends Action {
    payload: {
        taskId: string,
        jobId: string
    };
}
export function setTaskJob(taskId: string, jobId: string): SetTaskJobAction {
    return {
        type: SET_TASK_JOB,
        payload: { taskId, jobId }
    };
}