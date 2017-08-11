export type PgViewAction =
  selectEntry.Action |
  selectTask.Action |
  setFilter.Action |
  startEditing.Action |
  stopEditing.Action |
  toggleEditing.Action;

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

export function startEditing(): startEditing.Action {
  return {
    type: 'START_EDITING'
  };
}

export namespace startEditing {
  export type Action = {
    type: 'START_EDITING'
  };
  export const type = 'START_EDITING';
}

export function stopEditing(): stopEditing.Action {
  return {
    type: 'STOP_EDITING'
  };
}

export namespace stopEditing {
  export type Action = {
    type: 'STOP_EDITING'
  };
  export const type = 'STOP_EDITING';
}

export function toggleEditing(): toggleEditing.Action {
  return {
    type: 'TOGGLE_EDITING'
  };
}

export namespace toggleEditing {
  export type Action = {
    type: 'TOGGLE_EDITING'
  };
  export const type = 'TOGGLE_EDITING';
}