import { Map } from 'immutable';

import * as tasks from './pg-task';
import * as entries from './pg-entry';

export interface PgModel {
  tasks: Map<string, tasks.PgTask>;
  entries: Map<string, entries.PgEntry>;
}

export const defaultModel: PgModel = {
  tasks: Map<string, tasks.PgTask>(),
  entries: Map<string, entries.PgEntry>()
};

export function addTask(store: PgModel, task?: tasks.PgTask): PgModel {
  let newTask = task || tasks.createTask();
  return {
    tasks: store.tasks.set(newTask.taskId, newTask),
    entries: store.entries
  };
}