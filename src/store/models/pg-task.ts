import * as cuid from 'cuid';
import { Record } from 'immutable';

import { RecordType, RecordTypeConstructor, PgBase } from './pg-types';

export interface PgTask extends PgBase {
  parentTaskId: string;
  jobId: string;
  duration: number;
  name: string;
};

const defaultTask: PgTask = {
  _id: '',
  parentTaskId: '',
  jobId: '',
  duration: 0,
  name: ''
};

// There is an error in the type definitnions for Immutable.Record,
// so temporarily disable 'no-any' until Immutable v4 is released.
// tslint:disable-next-line:no-any
const PgTaskConstructor: RecordTypeConstructor<PgTask> = Record(defaultTask, 'PgTask') as any;
export type PgTaskRecord = RecordType<PgTask>;

export namespace PgTask {
  export function create(): PgTaskRecord {
    return new PgTaskConstructor({ _id: cuid() });
  }
  export function from(props: Partial<PgTask>): PgTaskRecord {
    return PgTaskConstructor({
      ...props,
      _id: props._id || cuid(),
    });
  }

  export function setParent(task: PgTaskRecord, parentTaskId: string): PgTaskRecord;
  export function setParent(task: PgTaskRecord, parentTask: PgTaskRecord): PgTaskRecord;
  export function setParent(task: PgTaskRecord, taskOrId: string | PgTaskRecord): PgTaskRecord {
    let taskId = typeof taskOrId === 'string' ? taskOrId : taskOrId.parentTaskId;
    return (PgTask.from(task) as PgTaskRecord).set('parentTaskId', taskId);
  }
}