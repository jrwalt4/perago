import { Map, Record } from 'immutable';

import { PgTask } from './pg-task';
import { PgEntry } from './pg-entry';
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

  export function create(): PgModel {
    return new PgModelConstructor();
  }

  type PgModelInputs = {
    tasks: Partial<PgTask>[],
    entries: Partial<PgEntry>[]
  };

  export function from({ tasks, entries }: PgModelInputs | PgModel): PgModel {
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
    return new PgModelConstructor({ tasks, entries } as PgModel);
  }

  export function addTask(model: PgModel, task?: Partial<PgTask>): PgModel {
    let pgTask = task == null ? PgTask.create() : PgTask.from(task);
    return (PgModel.from(model) as PgModelRecord).setIn(['tasks', pgTask._id], pgTask) as PgModelRecord;
  }

  export function setTaskName(model: PgModel, task: string | PgTask, name: string): PgModel {
    let taskId = typeof task === 'string' ? task : task._id;
    return (model as PgModelRecord).setIn(['tasks', taskId, 'name'], name) as PgModelRecord;
  }

  export function setTaskProject(model: PgModel, task: string | PgTask, project: string | PgTask): PgModel {
    let taskId = typeof task === 'string' ? task : task._id;
    let projectId = typeof project === 'string' ? project : project._id;
    return (model as PgModelRecord).setIn(['tasks', taskId, 'parentTask'], projectId || project) as PgModelRecord;
  }

  export function addEntry(model: PgModel, entry: PgEntry): PgModel {
    return (model as PgModelRecord).setIn(['entries', entry._id], entry) as PgModelRecord;
  }

  export function getActiveEntries(model: PgModel): Map<string, PgEntry> {
    return model.entries.filter((entry: PgEntry) => !entry.end) as Map<string, PgEntry>;
  }

  export function stopAllEntries(model: PgModel): PgModel {
    return getActiveEntries(model).reduce(
      (prevModel: PgModelRecord, entry: PgEntry) => {
        return prevModel.setIn(['entries', entry._id, 'end'], new Date());
      },
      model as PgModelRecord) as PgModelRecord;
  }
}