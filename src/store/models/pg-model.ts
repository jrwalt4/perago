import { Map, Record } from 'immutable';

import * as moment from 'moment';

import { PgTask } from './pg-task';
import { PgEntry, PgEntryRecord } from './pg-entry';
import { RecordType, RecordTypeConstructor } from './pg-types';

export interface PgModel {
  tasks: Map<string, PgTask>;
  entries: Map<string, PgEntry>;
}

export const defaultModel: PgModel = {
  tasks: Map<string, PgTask>(),
  entries: Map<string, PgEntry>()
};

// tslint:disable-next-line:no-any
const PgModelConstructor: RecordTypeConstructor<PgModel> = Record(defaultModel, 'PgModel') as any;
export type PgModelRecord = RecordType<PgModel>;

export namespace PgModel {

  export function create(): PgModelRecord {
    return new PgModelConstructor();
  }

  type PgModelInputs = {
    tasks: Partial<PgTask>[],
    entries: Partial<PgEntry>[]
  };

  export function from(model: PgModelInputs | PgModel): PgModelRecord {
    let { tasks, entries } = model;
    if (Array.isArray(tasks) && Array.isArray(entries)) {
      return new PgModelConstructor({
        tasks: Map.of.apply(void 0, tasks.reduce((inputArray, task) => {
          let pgTask = PgTask.from(task);
          return inputArray.concat([pgTask._id, pgTask]);
          // tslint:disable-next-line:align
        }, new Array<string | PgTask>())),
        entries: Map.of.apply(void 0, entries.reduce((inputArray, entry) => {
          let pgEntry = PgEntry.from(entry);
          return inputArray.concat([pgEntry._id, pgEntry]);
          // tslint:disable-next-line:align
        }, new Array<string | PgEntry>()))
      });
    }
    return isModelRecord(model) ? model : new PgModelConstructor({ tasks, entries } as PgModel);
  }

  export function addTask(model: PgModelRecord, task?: Partial<PgTask>): PgModelRecord {
    let pgTask = task == null ? PgTask.create() : PgTask.from(task);
    return PgModel.from(model).setIn(['tasks', pgTask._id], pgTask);
  }

  export function setTaskName(model: PgModelRecord, task: string | PgTask, name: string): PgModelRecord {
    let taskId = typeof task === 'string' ? task : task._id;
    return (model as PgModelRecord).setIn(['tasks', taskId, 'name'], name);
  }

  export function setTaskProject(model: PgModelRecord, task: string | PgTask, project: string | PgTask): PgModelRecord {
    let taskId = typeof task === 'string' ? task : task._id;
    let projectId = typeof project === 'string' ? project : project._id;
    return (model as PgModelRecord).setIn(['tasks', taskId, 'parentTask'], projectId || project);
  }

  export function addEntry(model: PgModelRecord, entry: PgEntry): PgModelRecord {
    return (model as PgModelRecord).setIn(['entries', entry._id], entry);
  }

  export function getActiveEntries(model: PgModelRecord): Map<string, PgEntry> {
    return model.entries.filter((entry: PgEntry) => !entry.end) as Map<string, PgEntry>;
  }

  export function stopAllEntries(model: PgModelRecord): PgModelRecord {
    return getActiveEntries(model).reduce(
      (prevModel: PgModelRecord, entry: PgEntry) => {
        return prevModel.setIn(['entries', entry._id, 'end'], new Date());
      },
      model);
  }

  export function setEntryStartTime(
    model: PgModelRecord, entryId: string, hour: number, minute: number = 0
  ): PgModelRecord {
    let entry = model.entries.get(entryId);
    let entryStart = new Date(entry.start);
    let newStart = moment({
      year: entryStart.getFullYear(),
      month: entryStart.getMonth(),
      date: entryStart.getDate(),
      hour,
      minute
    }).valueOf();
    return model.setIn(['entries', entryId, 'start'], newStart);
  }

  export function setEntryEndTime(
    model: PgModelRecord, entryId: string, hour: number, minute: number = 0
  ): PgModelRecord {
    let entry = model.entries.get(entryId);
    let entryEnd = entry.end ? new Date(entry.end) : new Date();
    let newEnd = moment({
      year: entryEnd.getFullYear(),
      month: entryEnd.getMonth(),
      date: entryEnd.getDate(),
      hour,
      minute
    }).valueOf();
    return model.setIn(['entries', entryId, 'end'], newEnd);
  }

  export function setEntryDate(model: PgModelRecord, entryId: string, date: moment.MomentInput): PgModelRecord {
    let entry = (model.entries.get(entryId) as PgEntryRecord).withMutations((e) => {
      return PgEntry.setEndDate(PgEntry.setStartDate(e, date), date);
    });
    return model.setIn(['entries', entryId], entry);
  }

  // tslint:disable-next-line:no-any
  function isModelRecord(model: any): model is PgModelRecord {
    return model && model.entries != null && model.tasks != null && ('setIn' in model);
  }
}