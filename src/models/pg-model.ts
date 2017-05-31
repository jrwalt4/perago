import { Map, Record } from 'immutable';

import { PgTask, PgTaskBase } from './pg-task';
import { PgEntry, PgEntryBase } from './pg-entry';
import { RecordType, RecordTypeConstructor, PgBase, ItemConstructor } from './pg-types';

export interface PgModelBase {
  tasks: Map<string, PgTask>;
  entries: Map<string, PgEntry>;
}

export const defaultModel: PgModelBase = {
  tasks: Map<string, PgTask>(),
  entries: Map<string, PgEntry>()
};

// tslint:disable-next-line:no-any
const PgModelConstructor: RecordTypeConstructor<PgModelBase> = Record(defaultModel, 'PgModel') as any;
export type PgModel = RecordType<PgModelBase>;

export namespace PgModel {

  export function create(): PgModel {
    return new PgModelConstructor();
  }

  export function from({ tasks, entries }: { tasks: Partial<PgTaskBase>[], entries: Partial<PgEntryBase>[] }): PgModel {
    let model = new PgModelConstructor();
    model = model.set('tasks', buildMap<PgTaskBase>(tasks, PgTask));
    model = model.set('entries', buildMap<PgEntryBase>(entries, PgEntry));
    return model;
  }

  function buildMap<T extends PgBase>(
    items: Partial<T>[],
    itemConstructor: ItemConstructor<T>
  ): Map<string, RecordType<T>> {
    return items.reduce((map, item) => {
      let itemRecord = itemConstructor.from(item);
      return map.set(itemRecord._id, itemRecord);
    // tslint:disable-next-line:align
    }, Map<string, RecordType<T>>());
  }

  export function addTask(model: PgModel, task?: PgTask): PgModel {
    task = task || PgTask.create();
    return model.setIn(['tasks', task._id], task) as PgModel;
  }
}