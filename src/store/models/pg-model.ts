/**
 * Modifiers include mutations, assuming will be used with immer library
 */
import { chain as _chain, sortBy as _sortBy } from 'lodash';
import { MomentInput } from 'moment';

import { PgTask, from as taskFrom, setName, setParent } from './pg-task';
import { PgEntry, from as entryFrom, setTask, setStartTime, setDate, setEndTime } from './pg-entry';

export interface PgModel {
  tasks: Map<string, PgTask>;
  entries: Map<string, PgEntry>;
}

export function create(): PgModel {
  return {
    tasks: new Map(),
    entries: new Map()
  };
}

export type PgModelInputs = {
  tasks: Partial<PgTask>[],
  entries: Partial<PgEntry>[],
} | PgModel;

export function from(model: PgModelInputs): PgModel {
  let { tasks, entries } = model;
  if (Array.isArray(tasks) && Array.isArray(entries)) {
    return {
      tasks: new Map<string, PgTask>(tasks.map((task) => {
        let pgTask = taskFrom(task);
        return [pgTask._id, pgTask] as [string, PgTask];
      })),
      entries: new Map(entries.map((entry) => {
        let pgEntry = entryFrom(entry);
        return [pgEntry._id, pgEntry] as [string, PgEntry];
      })),
    };
  } else {
    return model as PgModel;
  }
}

export function getTask(model: PgModel, taskOrId: string | PgTask): PgTask {
  const task = typeof taskOrId === 'string' ? model.tasks.get(taskOrId) : taskOrId;
  if (null == task) {
    throw new Error(`Task ${taskOrId} doesn not exist`);
  }
  return task;
}

export function addTask(model: PgModel, task: PgTask): PgModel {
  model.tasks.set(task._id, task);
  return model;
}

export function setTaskName(model: PgModel, taskOrId: PgTask | string, newName: string): PgModel {
  const task = getTask(model, taskOrId);
  setName(task, newName);
  return model;
}

export function getTaskParent(model: PgModel, taskId: string): PgTask | undefined;
export function getTaskParent(model: PgModel, task: PgTask): PgTask | undefined;
export function getTaskParent(model: PgModel, taskOrId: string | PgTask): PgTask | undefined {
  const task = getTask(model, taskOrId);
  let parentId = task.parentId;
  return model.tasks.get(parentId);
}

export function setTaskParent(model: PgModel, taskOrId: string | PgTask, newParent: string | PgTask): PgModel {
  const task = getTask(model, taskOrId);
  setParent(task, newParent);
  return model;
}

export function getTaskProject(model: PgModel, taskId: string): PgTask | undefined;
export function getTaskProject(model: PgModel, task: PgTask): PgTask | undefined;
export function getTaskProject(model: PgModel, taskOrId: string | PgTask): PgTask | undefined {
  let task = typeof taskOrId === 'string' ? model.tasks.get(taskOrId) : taskOrId;
  if (null == task) {
    throw new Error(`Task ${task} does not exist`);
  }
  let parent: PgTask | undefined = task;
  while (null != parent) {
    task = parent;
    parent = getTaskParent(model, task);
  }
  return parent;
}

export function getRecentTasks(model: PgModel, maxCount: number = 5): Map<string, PgTask> {
  return new Map(_chain(Array.from(model.entries.values())).groupBy(((entry: PgEntry) => entry.taskId))
    .map((entryArray) => {
      return _sortBy(entryArray, (entry: PgEntry) => entry.start)[0];
    })
    .sortBy((entry) => entry.start)
    .take(maxCount)
    .map((entry) => [entry.taskId, model.tasks.get(entry.taskId)] as [string, PgTask]).value());
}

export function getEntry(model: PgModel, entryOrId: PgEntry | string): PgEntry {
  let entryId = typeof entryOrId === 'string' ? entryOrId : entryOrId._id;
  if (!model.entries.has(entryId)) {
    throw new Error(`No entry '${entryId}'`);
  }
  return model.entries.get(entryId)!;
}

export function addEntry(model: PgModel, entry: PgEntry): PgModel {
  model.entries.set(entry._id, entry);
  return model;
}

export function deleteEntry(model: PgModel, entry: PgEntry | string): PgModel {
  let _id: string = typeof entry === 'string' ? entry : entry._id;
  model.entries.delete(_id);
  return model;
}

export function setEntryTask(model: PgModel, entryOrId: PgEntry | string, taskOrId: PgTask | string): PgModel {
  let entry = getEntry(model, entryOrId);
  let task = getTask(model, taskOrId);
  setTask(entry, task._id);
  return model;
}

export function setEntryStartTime(model: PgModel, entryOrId: PgEntry | string, hour: number, minute?: number): PgModel {
  let entry = getEntry(model, entryOrId);
  setStartTime(entry, hour, minute);
  return model;
}

export function setEntryEndTime(model: PgModel, entryOrId: PgEntry | string, hour: number, minute?: number): PgModel {
  let entry = getEntry(model, entryOrId);
  setEndTime(entry, hour, minute);
  return model;
}

export function setEntryDate(model: PgModel, entryOrId: string, date: MomentInput): PgModel {
  let entry = getEntry(model, entryOrId);
  setDate(entry, date);
  return model;
}

export function getActiveEntries(model: PgModel): Map<string, PgEntry> {
  const activeEntries = new Map<string, PgEntry>();
  for (let [_id, entry] of model.entries) {
    if (null != entry.end) {
      activeEntries.set(_id, entry);
    }
  }
  return activeEntries;
}

export function stopAllEntries(model: PgModel): PgModel {
  getActiveEntries(model).forEach(
    (entry: PgEntry) => {
      entry.end = Date.now();
    });
  return model;
}
