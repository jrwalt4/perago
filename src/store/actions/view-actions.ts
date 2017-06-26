export type PgViewAction =
  selectEntry.Type |
  selectTask.Type |
  setFilter.Type;

export function selectEntry(entryId: string): selectEntry.Type {
  return {
    type: 'SELECT_ENTRY',
    payload: entryId
  };
}

export namespace selectEntry {
  export type Type = {
    type: 'SELECT_ENTRY',
    payload: string
  };
  export const Type = 'SELECT_ENTRY';
}

export function selectTask(taskId: string): selectTask.Type {
  return {
    type: 'SELECT_TASK',
    payload: taskId
  };
}

export namespace selectTask {
  export type Type = {
    type: 'SELECT_TASK',
    payload: string
  };
  export const Type = 'SELECT_TASK';
}

export function setFilter(filter: string): setFilter.Type {
  return {
    type: 'SET_FILTER',
    payload: filter
  };
}

export namespace setFilter {
  export type Type = {
    type: 'SET_FILTER'
    payload: string
  };
  export const Type = 'SET_FILTER';
}