import { createSelector } from 'reselect';
import { PgAppState } from 'store';
import { PgModel } from 'store/models';

export const modelSelector = (state: PgAppState) => state.model;

export const entriesSelector = (state: PgAppState) => state.model.entries;

export const entriesArraySelector = createSelector(
  [entriesSelector],
  (entries) => entries.toArray()
  );
  
export const tasksSelector = (state: PgAppState) => state.model.tasks;

export const tasksArraySelector = createSelector(
  [tasksSelector],
  (tasks) => tasks.toArray()
);
  
export const selectedEntryIdSelector = (state: PgAppState) => state.view.selectedEntry;

export const selectedEntrySelector = createSelector(
  [entriesSelector, selectedEntryIdSelector],
  (entries, selectedEntry) => entries.get(selectedEntry)
);

export const taskIdSelector = (state: PgAppState, props: { taskId: string }) => props.taskId;

export const taskProjectSelector = createSelector(
  [modelSelector, taskIdSelector],
  (model: PgModel, taskId: string) => PgModel.getTaskProject(model, taskId)
);

export const recentTasksArraySelector = createSelector(
  [modelSelector],
  (model: PgModel) => PgModel.getRecentTasks(model).toArray()
);

export const isEditingSelector = (state: PgAppState) => state.view.isEditing;
