import { createSelector } from 'reselect';
import { PgAppState } from 'store';
import { PgModel, getRecentTasks, getTaskProject } from 'store/models/pg-model';

export const modelSelector = (state: PgAppState) => state.model;

export const entriesSelector = (state: PgAppState) => state.model.entries;

export const entriesArraySelector = createSelector(
  [entriesSelector],
  (entries) => Array.from(entries.values())
  );
  
export const tasksSelector = (state: PgAppState) => state.model.tasks;

export const tasksArraySelector = createSelector(
  [tasksSelector],
  (tasks) => Array.from(tasks.values())
);
  
export const selectedEntryIdSelector = (state: PgAppState) => state.view.selectedEntry;

export const selectedEntrySelector = createSelector(
  [entriesSelector, selectedEntryIdSelector],
  (entries, selectedEntry) => entries.get(selectedEntry)
);

export const taskIdSelector = (state: PgAppState, props: { taskId: string }) => props.taskId;

export const taskProjectSelector = createSelector(
  [modelSelector, taskIdSelector],
  (model: PgModel, taskId: string) => getTaskProject(model, taskId)
);

export const recentTasksArraySelector = createSelector(
  [modelSelector],
  (model: PgModel) => Array.from(getRecentTasks(model).values())
);

export const isEditingSelector = (state: PgAppState) => state.view.isEditing;
