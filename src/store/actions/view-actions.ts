export type PgViewAction =
  selectEntry.Action |
  selectTask.Action |
  setFilter.Action;

export function selectEntry(entryId: string): selectEntry.Action {
  return {
    type: 'SELECT_ENTRY',
    payload: entryId
  };
}

export namespace selectEntry {
  export type Action = {
    type: 'SELECT_ENTRY',
    payload: string
  };
  export const type = 'SELECT_ENTRY';
}

export function selectTask(taskId: string): selectTask.Action {
  return {
    type: 'SELECT_TASK',
    payload: taskId
  };
}

export namespace selectTask {
  export type Action = {
    type: 'SELECT_TASK',
    payload: string
  };
  export const type = 'SELECT_TASK';
}

export function setFilter(filter: string): setFilter.Action {
  return {
    type: 'SET_FILTER',
    payload: filter
  };
}

export namespace setFilter {
  export type Action = {
    type: 'SET_FILTER'
    payload: string
  };
  export const type = 'SET_FILTER';
}